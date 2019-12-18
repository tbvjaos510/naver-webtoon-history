export enum StoreLocation {
  /**
   * chrome.local
   */
  LOCAL = "local",

  /**
   * chrome.sync
   */
  SYNC = "sync"
}

export enum LinkTarget {
  /**
   * 새 탭
   */
  TAB = "tab",

  /**
   * 현재 탭
   */
  CURRENT = "current",

  /**
   * 사이드바
   * whale 브라우저에서만 지원
   */
  SIDEBAR = "sidebar",

  /**
   * 모바일 창
   * whale 브라우저에서만 지원
   */
  MOBILE = "mobile"
}

export enum OrderBy {
  VIEW_COUNT = "view_count",
  UPDATE = "update",
  STAR_SCORE = "star_score",
  TITLE = "title"
}

export interface SettingStorage {
  /**
   * 웹툰 기록을 저장할 장소
   * @default "local"
   */
  storeLocation: StoreLocation;

  /**
   * 자동으로 다음화로 넘어가는 여부
   * @default false
   */
  autoNext: boolean;

  /**
   * 웹툰 뷰 페이지에서 댓글을 숨기는 여부
   * @default false
   */
  hiddenComment: boolean;

  /**
   * 확장앱에서 링크를 열 때 열릴 위치
   * @default LinkTarget.TAB
   */
  linkTarget: LinkTarget;

  orderBy: OrderBy;

  saveFavorate: boolean;

  showFavorate: boolean;

  saveScroll: boolean;

  saveWebtoonSort: boolean;

  scrollAlert: boolean;

  showHistory: boolean;

  useContextMenu: boolean;

  useImageLog: boolean;
}
