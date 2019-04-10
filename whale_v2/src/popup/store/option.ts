import { observable, action, computed } from "mobx";

export const storeKeys = [
  "_storeLocation",
  "_orderBy",
  "_showHistory",
  "_historyMax",
  "_saveWebtoonSort",
  "_saveScroll",
  "_hiddenComment",
  "_autoNext",
  "_useImgLog",
  "_saveFavorate",
  "_linkTarget",
  "_scrollAlert",
  "_useContextMenu"
];

export type ChromeStore = "local" | "sync" | null;
export type WebtoonOrder = "ViewCount" | "Update" | "StarScore" | "TitleName";
export type LinkTarget = "Tab" | "Current" | "Popup" | "Sidebar";

export default class OptionStore {
  private readonly defaultOption;

  private get optionObject() {
    const obj = {};
    storeKeys.forEach(key => {
      obj[key] = this[key];
    });
    return obj;
  }

  private saveToStore() {
    chrome.storage.sync.set({
      option: JSON.stringify(this.optionObject)
    });
  }

  public getUseBytes() {
    chrome.storage.local.getBytesInUse(use => {
      this.localUsage = use;
    });
    chrome.storage.sync.getBytesInUse(use => {
      this.syncUsage = use;
    });
  }

  public onLoad: () => void = () => {
    console.log("Webtoon Not Inited");
  };

  private isPreviousVersion: boolean = false;

  /**
   * 생성자
   */
  constructor(isBackground: boolean) {
    this.defaultOption = this.optionObject;
    this.isBackground = isBackground;
    // Chrome Storage로부터 설정값을 초기화
    chrome.storage.sync.get("option", ({ option: item }) => {
      if (item && item.sort != undefined) {
        // 1.6.2 Only
        this.isPreviousVersion = true;
        return;
      }
      if (item) item = JSON.parse(item);
      if (item && Object.keys(item).length === storeKeys.length) {
        storeKeys.forEach(key => {
          this[key] = item[key];
        });
        this.getUseBytes();
        this.onLoad();
      } else if (!item || Object.keys(item).length === 0) {
        chrome.storage.sync.set(
          {
            option: JSON.stringify(this.optionObject)
          },
          () => {
            this.getUseBytes();
            console.log("Option Init");
            this.onLoad();
          }
        );
      } else {
        Object.keys(storeKeys).forEach(key => {
          if (item[key]) {
            this[key] = item[key];
          }
        });
        chrome.storage.sync.set({ option: JSON.stringify(this.optionObject) }, () => {
          this.getUseBytes();
          console.log("Update Complate");
          this.onLoad();
        });
      }
    });

    // chrome storage를 store와 동기화
    chrome.storage.onChanged.addListener((change, area) => {
      if (change.option && change.option.newValue) {
        if (change.option.newValue.sort) return; // Dev Only
        const option = JSON.parse(change.option.newValue);
        storeKeys.forEach(key => {
          if (option[key] !== undefined) {
            this[key] = option[key];
          }
        });
        if (this.isPreviousVersion) {
          this.onLoad();
          this.isPreviousVersion = false;
        }
        this.getUseBytes();
      }
    });
  }

  @observable
  public isBackground: boolean;

  @observable
  public localUsage: number = 0;

  @observable
  public syncUsage: number = 0;

  /**
   * 사용자 데이터를 저장할 저장소
   */
  @observable
  private _storeLocation: ChromeStore = "local";

  @computed
  public get storeLocation(): ChromeStore {
    return this._storeLocation;
  }

  public set storeLocation(value: ChromeStore) {
    this._storeLocation = value;
    this.historyMax = this.historyMax;
    this.saveToStore();
  }

  /**
   * 웹툰 정렬 방식
   */
  @observable
  private _orderBy: WebtoonOrder = "ViewCount";

  @computed
  public get orderBy(): WebtoonOrder {
    return this._orderBy;
  }

  public set orderBy(value: WebtoonOrder) {
    this._orderBy = value;
    this.saveToStore();
  }

  /**
   * 웹툰 기록을 보이는 여부
   */
  @observable
  private _showHistory: boolean = true;

  @computed
  public get showHistory(): boolean {
    return this._showHistory;
  }

  public set showHistory(value: boolean) {
    this._showHistory = value;
    this.saveToStore();
  }

  /**
   * 최대 기록 저장 개수
   */
  @observable
  private _historyMax: number = 1000;

  @computed
  public get historyMax(): number {
    return this._historyMax;
  }

  public set historyMax(value: number) {
    if (this._storeLocation === "sync" && value > 200) value = 200;
    if (this._storeLocation === "local" && value > 1000) value = 1000;
    this._historyMax = value;
    this.saveToStore();
  }

  /**
   * 요일별 웹툰 사용자 지정 순서를 적용하는 여부
   */
  @observable
  private _saveWebtoonSort: boolean = true;

  @computed
  public get saveWebtoonSort(): boolean {
    return this._saveWebtoonSort;
  }

  public set saveWebtoonSort(value: boolean) {
    this._saveWebtoonSort = value;
    this.saveToStore();
  }

  /**
   * 스크롤을 저장하는 여부
   */
  @observable
  private _saveScroll: boolean = true;

  @computed
  public get saveScroll(): boolean {
    return this._saveScroll;
  }

  public set saveScroll(value: boolean) {
    this._saveScroll = value;
    if (value === true) {
      this._scrollAlert = true;
    }
    this.saveToStore();
  }

  @observable
  private _scrollAlert: boolean = true;

  @computed
  public get scrollAlert(): boolean {
    return this._scrollAlert;
  }

  public set scrollAlert(value: boolean) {
    this._scrollAlert = value;
    this.saveToStore();
  }

  /**
   * 댓글을 숨기는 여부
   */
  @observable
  private _hiddenComment: boolean = false;

  @computed
  public get hiddenComment(): boolean {
    return this._hiddenComment;
  }

  public set hiddenComment(value: boolean) {
    this._hiddenComment = value;
    this.saveToStore();
  }

  /**
   * 자동으로 자동화로 넘어가는 여부
   */
  @observable
  private _autoNext: boolean = true;

  @computed
  public get autoNext(): boolean {
    return this._autoNext;
  }

  public set autoNext(value: boolean) {
    this._autoNext = value;
    this.saveToStore();
  }

  /**
   * 이미지 경로를 로그로 저장하는 여부
   */
  @observable
  private _useImgLog: boolean = true;

  @computed
  public get useImgLog(): boolean {
    return this._useImgLog;
  }

  public set useImgLog(value: boolean) {
    this._useImgLog = value;
    if (value === false) {
      chrome.storage.local.remove("imglog");
    }
    this.saveToStore();
  }

  /**
   * 즐겨찾기를 추가하는 여부
   */
  @observable
  private _saveFavorate: boolean = true;

  @computed
  public get saveFavorate(): boolean {
    return this._saveFavorate;
  }

  public set saveFavorate(value: boolean) {
    this._saveFavorate = value;
    this.saveToStore();
  }

  /**
   * 링크를 열 위치
   */
  @observable
  private _linkTarget: LinkTarget = "Tab";

  @computed
  public get linkTarget(): LinkTarget {
    return this._linkTarget;
  }

  public set linkTarget(value: LinkTarget) {
    this._linkTarget = value;
    this.saveToStore();
  }

  /**
   * ContextMenu 사용 여부
   */
  @observable
  private _useContextMenu: boolean = false;

  @computed
  public get useContextMenu(): boolean {
    return this._useContextMenu;
  }

  public set useContextMenu(value: boolean) {
    this._useContextMenu = value;
    this.saveToStore();
  }

  /**
   * 스토어 초기화
   * @param store 초기화 할 스토어 위치
   */
  public resetStore(store: ChromeStore) {
    if (store === "local") {
      chrome.storage.local.clear(() => {
        this.getUseBytes();
      });
    } else {
      chrome.storage.sync.remove(
        ["webtoon", "visists", "scorlls", "favorate", "sortWebtoon"],
        () => {
          this.resetOption();
        }
      );
    }
  }

  public resetOption(onLoad?) {
    chrome.storage.sync.set(
      {
        option: JSON.stringify(this.defaultOption)
      },
      onLoad && onLoad
    );
  }
}
