import { observable, computed, action, runInAction } from "mobx";
import OptionStore from "./option";
import WebtoonRequest, { ogInfo, WebtoonInfo } from "../request";

export type LoadingStatus = "not start" | "start" | "end";

export type WebtoonType = {
  [key: number]: {
    title: string;
    type: "webtoon" | "bestChallenge" | "challenge" | string;
  };
};

export type VisitType = {
  [key: number]: {
    [key: number]: number;
  }[];
};

export type ScrollType = {
  [key: number]: {
    [key: number]: number;
  };
};

export type ImglogType = {
  [key: string]: {
    image: string;
    name: string;
  };
};

export interface RecentWebtoon {
  id: number;
  lastVisit: number;
  name: string;
  no: number;
  scroll?: number;
  type: string;
  noname: string;
  img: string;
}
export default class WebtoonStore {
  private saveToStore(key, value) {
    chrome.storage[this.option.storeLocation].set(
      {
        [key]: value
      },
      () => {
        this.option.getUseBytes();
      }
    );
  }

  private option: OptionStore;

  constructor(option: OptionStore) {
    this.option = option;
    this.storage.get(["webtoon", "visits", "scrolls"], value => {
      if (value.scrolls) this._scrolls = value.scrolls;
      if (value.visits) this._visits = value.visits;
      if (value.webtoon) this._webtoonType = value.webtoon;
      this.getRecentWebtoon();
      WebtoonRequest.getAllWebtoon(this.option.orderBy).then(value => {
        this._dailyWebtoons = value;
        console.log(value);
      });
    });
  }

  @computed get storage() {
    return chrome.storage[this.option.storeLocation];
  }

  /**
   * 방문한 웹툰의 제목과 타입을 저장합니다.
   */
  @observable
  private _webtoonType: WebtoonType = {};

  @computed
  public get webtoonType(): WebtoonType {
    return this._webtoonType;
  }
  public set webtoonType(value: WebtoonType) {
    this._webtoonType = value;
    this.saveToStore("webtoon", value);
  }

  /**
   * 방문한 회차의 정보를 저장합니다.
   */
  @observable
  private _visits: VisitType = {};
  @computed
  public get visits(): VisitType {
    return this._visits;
  }
  public set visits(value: VisitType) {
    this._visits = value;
    this.saveToStore("visits", value);
  }

  /**
   * 사용자가 본 스크롤 데이터를 저장합니다.
   */
  @observable
  private _scrolls: ScrollType = {};
  @computed
  public get scrolls(): ScrollType {
    return this._scrolls;
  }
  public set scrolls(value: ScrollType) {
    this._scrolls = value;
    this.saveToStore("scrolls", value);
  }

  /**
   * 웹툰 정보를 따로 저장합니다.
   */
  @observable
  private _imglog: ImglogType = {};
  @computed
  public get imglog(): ImglogType {
    return this._imglog;
  }
  public set imglog(value: ImglogType) {
    if (!this.option.useImgLog) {
      console.error("imglog 미사용 중");
    }
    this._imglog = value;
    this.saveToStore("imglog", value);
  }

  /**
   * 최근 웹툰들.
   */
  @observable
  private _recentWebtoon: RecentWebtoon[] = [];

  @computed
  public get recentWebtoon(): RecentWebtoon[] {
    return this._recentWebtoon;
  }

  public set recentWebtoon(value: RecentWebtoon[]) {
    this._recentWebtoon = value;
  }

  /**
   * 요일 별 웹툰
   *
   */
  @observable
  private _dailyWebtoons: WebtoonInfo = {};

  @computed
  public get dailyWebtoons(): WebtoonInfo {
    return this._dailyWebtoons;
  }
  public set dailyWebtoons(value: WebtoonInfo) {
    this._dailyWebtoons = value;
  }

  /**
   * 웹툰 기록의 개수
   *
   * @readonly
   */
  @computed get visitCount() {
    let result = 0;
    Object.keys(this.visits).forEach(v => {
      result += Object.keys(this.visits[v]).length;
    });
    return result;
  }

  @action requestInfo() {}

  @observable loadingStatus: LoadingStatus = "not start";

  @action
  public async getRecentWebtoon() {
    const webtoons: RecentWebtoon[] = [];
    const promises: Promise<void>[] = [];
    this.loadingStatus = "start";
    Object.keys(this._visits).forEach(key => {
      Object.keys(this._visits[key]).forEach(key2 => {
        if (!this._imglog[key + "-" + key2]) {
          promises.push(
            WebtoonRequest.getOpenGraph(
              `https://comic.naver.com${
                this._webtoonType[key].type
              }/detail.nhn?titleId=${key}&no=${key2}`
            ).then(value => {
              if (value) {
                webtoons.push({
                  id: parseInt(key),
                  lastVisit: this._visits[key][key2] * 1000,
                  name: this._webtoonType[key].title,
                  no: parseInt(key2),
                  scroll: this._scrolls[key] ? this._scrolls[key][key2] : null,
                  type: this._webtoonType[key].type,
                  img: value.img,
                  noname: value.title
                });
                if (this.option.useImgLog) {
                  this._imglog[key + "-" + key2] = {
                    image: value.img,
                    name: value.title
                  };
                }
              }
            })
          );
        } else {
          const { image, name } = this._imglog[key + "-" + key2];
          webtoons.push({
            id: parseInt(key),
            lastVisit: this._visits[key][key2] * 1000,
            name: this._webtoonType[key].title,
            no: parseInt(key2),
            scroll: this._scrolls[key] ? this._scrolls[key][key2] : null,
            type: this._webtoonType[key].type,
            img: image,
            noname: name
          });
        }
      });
    });
    await Promise.all(promises);
    webtoons.sort((a, b) => {
      if (a.lastVisit < b.lastVisit) return 1;
      return -1;
    });
    runInAction(() => {
      this.recentWebtoon = webtoons;
      this.loadingStatus = "end";
      // Save to Chrome
      this.imglog = this._imglog;
      console.log(webtoons);
    });
  }

  @action setVisitsFromChrome() {
    chrome.history.search(
      {
        text: "detail.nhn?titleId=",
        startTime: 0,
        maxResults: 5000
      },
      data => {
        this.webtoonType = this.visits = {};
        let webtoon: WebtoonType = {};
        let visits: VisitType = {};
        let index = 0;

        data.forEach(d => {
          if (!d.title || index >= this.option.historyMax) return false;
          const url = new URL(d.url);
          const params = url.searchParams;
          let wid = params.get("titleId");
          let wno = params.get("no");

          if (!wid || !wno) return false;
          if (!webtoon[wid]) {
            webtoon[wid] = {};
            visits[wid] = {};
            webtoon[wid].title = d.title.split("::")[0];
            webtoon[wid].type = url.pathname.split("/detail.nhn")[0];
          }
          if (!visits[wid][wno]) {
            index++;
            visits[wid][wno] = Math.floor(d.lastVisitTime / 1000);
          }
        });
        this.webtoonType = webtoon;
        this.visits = visits;

        // @ts-ignore
        UIkit.notification(
          `<div class="uk-text-small">방문기록에서 총 ${
            this.visitCount
          }개의 기록을 불러왔습니다.</div>`,
          {
            timeout: 2000
          }
        );
      }
    );
  }
}
