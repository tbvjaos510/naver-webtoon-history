import { observable, action, computed } from "mobx";

export type ChromeStore = "local" | "sync" | null;
export type WebtoonOrder = "ViewCount" | "Update" | "StarScore" | "TitleName";
export type LinkTarget = "Tab" | "Current" | "Popup";

export default class OptionStore {
  private saveToStore() {
    chrome.storage.sync.set({
      option: this
    });
  }

  /**
   * 생성자
   */
  constructor() {
    // Chrome Storage로부터 설정값을 ㅊ기화
    chrome.storage.sync.get("option", item => {
      if (item) {
        Object.keys(item).forEach(key => {
          this[key] = item[key];
        });
      } else {
        chrome.storage.sync.set(
          {
            option: this
          },
          () => {
            console.log("Option Init");
          }
        );
      }
    });
  }

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
  private _historyMax: number = 2000;

  @computed
  public get historyMax(): number {
    return this._historyMax;
  }

  public set historyMax(value: number) {
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
    this.saveToStore();
  }

  /**
   * 댓글을 숨기는 여부
   */
  @observable
  private _hiddenComment: boolean = true;

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
}
