import { observable, computed, action, observe, toJS } from "mobx";
import OptionStore from "./option";
import WebtoonRequest, { WebtoonInfoType, WebtoonInfo, Week } from "../request";

// export type SaveType = "imglog" | "favorate" | "scrolls" | "visits" | "webtoon";

export type LoadingStatus = "not start" | "start" | "end";

export type WebtoonType = {
  [key: number]: {
    title: string;
    type: "webtoon" | "bestChallenge" | "challenge" | string;
  };
};
export type storageType = {
  scrolls: ScrollType;
  visits: VisitType;
  webtoon: WebtoonType;
  favorate: StaredType;
  sortWebtoon: SortWebtoonType;
  imglog: ImglogType;
};
export type SaveType = keyof storageType;

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

export interface SortWebtoonType {
  [key: string]: number[];
}

export type StaredType = number[];

export interface RecentWebtoon {
  id: number;
  lastVisit: number;
  name: string;
  no: number;
  type: string;
  noname?: string;
  img?: string;
}
export default class WebtoonStore {
  private saveToStore<T extends SaveType>(key: T, value: storageType[T]) {
    if (key === "webtoon" || key === "visits" || key === "scrolls") {
      this.storage.set(
        {
          [key]: JSON.stringify(value)
        },
        () => {
          this.option.getUseBytes();
        }
      );
    } else if (key === "imglog") {
      chrome.storage.local.set(
        {
          [key]: JSON.stringify(value)
        },
        () => {
          this.option.getUseBytes();
        }
      );
    } else {
      chrome.storage.sync.set(
        {
          [key]: JSON.stringify(value)
        },
        () => {
          this.option.getUseBytes();
        }
      );
    }
  }

  public setDailyWebtoon() {
    WebtoonRequest.getAllWebtoon(this.option.orderBy).then(webtoons => {
      if (this.option.saveWebtoonSort) {
        if (JSON.stringify(this._sortWebtoon) === JSON.stringify({})) {
          Object.keys(webtoons).forEach((key: Week) => {
            if (!this._sortWebtoon[key]) this._sortWebtoon[key] = [];
            this._sortWebtoon[key] = webtoons[key].map(v => v.id);
          });
          this.sortWebtoon = this._sortWebtoon;
        } else {
          Object.keys(webtoons).forEach((key: Week) => {
            const sorted = this._sortWebtoon[key];
            // 정렬
            webtoons[key].sort((a, b) => (sorted.indexOf(a.id) > sorted.indexOf(b.id) ? 1 : -1));
            // 새로 생긴 웹툰이나 사라진 웹툰을 sortWebtoon에 적용
            this._sortWebtoon[key] = webtoons[key].map(item => item.id);
          });
        }
      }
      this.sortWebtoon = this._sortWebtoon;
      this.dailyWebtoons = webtoons;
    });
  }

  private option: OptionStore;

  constructor(option: OptionStore, onLoad?: () => void) {
    this.option = option;
    this.option.onLoad = () => {
      this.storage.get(["webtoon", "visits", "scrolls"], ({ webtoon, visits, scrolls }) => {
        chrome.storage.local.get(["imglog"], ({ imglog }) => {
          chrome.storage.sync.get(["favorate", "sortWebtoon"], ({ favorate, sortWebtoon }) => {
            if (scrolls) this._scrolls = JSON.parse(scrolls);
            if (visits) this._visits = JSON.parse(visits);
            if (webtoon) this._webtoonType = JSON.parse(webtoon);
            if (favorate) this._starWebtoons = JSON.parse(favorate);
            if (sortWebtoon) this._sortWebtoon = JSON.parse(sortWebtoon);
            if (imglog) this._imglog = JSON.parse(imglog);
            this.setRecentWebtoon();
            this.setDailyWebtoon();
            if (!this.option.isBackground) {
              observe(option, "orderBy", change => {
                this.setDailyWebtoon();
              });
              observe(option, "saveWebtoonSort", change => {
                this.setDailyWebtoon();
              });
            }
          });
        });
      });
      chrome.storage.onChanged.addListener(
        (change: { [key in SaveType]: chrome.storage.StorageChange }, area) => {
          Object.keys(change).forEach((key: SaveType) => {
            const value = change[key].newValue || "{}";

            if (key === "sortWebtoon" && !value) this.setDailyWebtoon();
            if (key === "favorate") {
              if (value != JSON.stringify(this._starWebtoons)) {
                this._starWebtoons = JSON.parse(value);
              }
            } else if (key === "imglog") {
              if (value != JSON.stringify(this._imglog)) {
                this._imglog = JSON.parse(value);
              }
            } else if (key === "scrolls") {
              if (value != JSON.stringify(this._scrolls)) {
                this._scrolls = JSON.parse(value);
              }
            } else if (key === "visits") {
              if (value != JSON.stringify(this._visits)) {
                this._visits = JSON.parse(value);
                this.setRecentWebtoon();
              }
            } else if (key === "webtoon") {
              if (value != JSON.stringify(this._webtoonType)) {
                this._webtoonType = JSON.parse(value);
                this.setRecentWebtoon();
              }
            } else if (key === "sortWebtoon") {
              if (value != JSON.stringify(this._sortWebtoon)) {
                this._sortWebtoon = JSON.parse(value);
              }
            }
          });
          this.option.getUseBytes();
        }
      );
      if (onLoad) onLoad();
    };
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

  @observable
  public MaxView: number = 20;

  /**
   * 최근 웹툰들.
   */
  @observable
  private _recentWebtoon: RecentWebtoon[] = [];

  @computed
  public get recentWebtoon(): RecentWebtoon[] {
    return this._recentWebtoon
      .map((item, idx) => {
        if (idx < this.MaxView) {
          return item;
        }
      })
      .filter(item => item !== undefined);
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
   * 즐겨찾기 한 웹툰
   *
   */
  @observable
  private _starWebtoons: StaredType = [];

  @computed
  public get starWebtoons(): StaredType {
    return this._starWebtoons;
  }

  public set starWebtoons(value: StaredType) {
    this._starWebtoons = value;
    this.saveToStore("favorate", value);
    console.log("change starWebtoons");
  }

  @observable
  private _sortWebtoon: SortWebtoonType = {};

  @computed
  public get sortWebtoon(): SortWebtoonType {
    return this._sortWebtoon;
  }

  public set sortWebtoon(value: SortWebtoonType) {
    this._sortWebtoon = value;
    this.saveToStore("sortWebtoon", value);
  }

  @computed
  public get starWebtoonInfo(): WebtoonInfoType[] {
    const returnValue: WebtoonInfoType[] = [];
    this._starWebtoons.forEach(webtoonId => {
      (Object.keys(this._dailyWebtoons).map(
        key => this._dailyWebtoons[key]
      ) as WebtoonInfoType[][]).forEach(wlist => {
        wlist.forEach(webtoon => {
          // read-only object를 clone함.
          const wt = Object.assign({}, webtoon);
          if (wt.id === webtoonId) {
            let exists = false;
            returnValue.forEach(({ id, isUp, isRest }) => {
              if (id === wt.id) exists = true;

              if (isRest || isUp) {
                returnValue.forEach(find => {
                  if (find.id === id) {
                    find.isUp = isUp;
                    find.isRest = isRest;
                  }
                });
              }
            });
            if (!exists) returnValue.push(wt);
          }
        });
      });
    });

    // Object.keys(this._starWebtoons).forEach(value => {
    //   console.log(toJS(this._starWebtoons));
    //   if (this._starWebtoons[value]) {
    //     (Object.keys(this._dailyWebtoons).map(
    //       key => this._dailyWebtoons[key]
    //     ) as WebtoonInfoType[][]).forEach(wlist => {
    //       wlist.forEach(webtoon => {
    //         // read-only object를 clone함.
    //         const wt = Object.assign({}, webtoon);
    //         if (wt.id === parseInt(value)) {
    //           let exists = false;
    //           returnValue.forEach(({ id, isUp, isRest }) => {
    //             if (id === wt.id) exists = true;

    //             if (isRest || isUp) {
    //               returnValue.forEach(find => {
    //                 if (find.id === id) {
    //                   find.isUp = isUp;
    //                   find.isRest = isRest;
    //                 }
    //               });
    //             }
    //           });
    //           if (!exists) returnValue.push(wt);
    //         }
    //       });
    //     });
    //   }
    // });
    console.log(returnValue);
    return returnValue;
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

  @observable loadingStatus: LoadingStatus = "not start";

  @action
  public async setRecentWebtoon() {
    const webtoons: RecentWebtoon[] = [];
    const promises: Promise<void>[] = [];
    this.loadingStatus = "start";
    Object.keys(this._visits).forEach(key => {
      Object.keys(this._visits[key]).forEach(key2 => {
        if (this.option.isBackground) {
          if (!this._webtoonType[key]) return;
          webtoons.push({
            id: parseInt(key),
            lastVisit: this._visits[key][key2] * 1000,
            name: this._webtoonType[key].title,
            no: parseInt(key2),
            type: this._webtoonType[key].type
          });
        } else if (!this.option.useImgLog || !this._imglog[`${key}-${key2}`]) {
          promises.push(
            WebtoonRequest.getOpenGraph(
              this._webtoonType[key].type,
              parseInt(key),
              parseInt(key2)
            ).then(value => {
              if (value) {
                webtoons.push({
                  id: parseInt(key),
                  lastVisit: this._visits[key][key2] * 1000,
                  name: this._webtoonType[key].title,
                  no: parseInt(key2),
                  type: this._webtoonType[key].type,
                  img: value.img,
                  noname: value.title
                });
                if (this.option.useImgLog) {
                  this._imglog[`${key}-${key2}`] = {
                    image: value.img.replace("https://shared-comic.pstatic.net/thumb/", ""),
                    name: value.title
                  };
                }
              } else {
                delete this._visits[key][key2];
                this.visits = this._visits;
              }
            })
          );
        } else {
          const { image, name } = this._imglog[`${key}-${key2}`];
          webtoons.push({
            id: parseInt(key),
            lastVisit: this._visits[key][key2] * 1000,
            name: this._webtoonType[key].title,
            no: parseInt(key2),
            type: this._webtoonType[key].type,
            img: "https://shared-comic.pstatic.net/thumb/" + image,
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
    this.recentWebtoon = webtoons;
    this.loadingStatus = "end";
    // Save to Chrome
    if (this.option.useImgLog && !this.option.isBackground) this.imglog = this._imglog;
    this._visits = this._visits;
    console.log(webtoons);
  }

  @action setVisitsFromChrome() {
    this.loadingStatus = "start";
    chrome.history.search(
      {
        text: "detail.nhn?titleId=",
        startTime: 0,
        maxResults: 5000
      },
      data => {
        this.webtoonType = this.visits = {};
        const webtoon: WebtoonType = {};
        const visits: VisitType = {};
        let index = 0;

        data.forEach(d => {
          if (!d.title || index >= this.option.historyMax) return false;
          const url = new URL(d.url);
          const params = url.searchParams;
          const wid = params.get("titleId");
          const wno = params.get("no");

          if (!wid || !wno) return false;
          if (!webtoon[wid]) {
            webtoon[wid] = {};
            visits[wid] = {};
            webtoon[wid].title = d.title.split("::")[0].trim();
            webtoon[wid].type = url.pathname.split("/detail.nhn")[0];
          }
          if (!visits[wid][wno]) {
            index++;
            visits[wid][wno] = Math.floor(d.lastVisitTime / 1000);
          }
        });
        this.webtoonType = webtoon;
        this.visits = visits;
        if (window["UIkit"]) {
          UIkit.notification(`<div class="uk-text-small">방문기록에서 기록을 불러왔습니다.</div>`, {
            timeout: 2000
          });
        }
      }
    );
  }
}
