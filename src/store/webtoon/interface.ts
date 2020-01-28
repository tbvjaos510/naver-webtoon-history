export type WebtoonID = number;

export enum WebtoonType {
  WEBTOON = "w",
  BEST_CHALLENGE = "b",
  CHALLENGE = "c"
}

export enum Day {
  SUN = "sun",
  MON = "mon",
  TUE = "tue",
  WED = "wed",
  THU = "thu",
  FRI = "fri",
  SAT = "sat"
}

export interface WebtoonInfo {
  title: string;
  type: WebtoonType;
}

export interface WebtoonNoInfo {
  name: string;
  thumbnail: string;
}

export interface WebtoonStorage {
  [webtoonId: number]: WebtoonInfo;
}

export interface CacheStorage {
  [webtoonId: number]: {
    [no: number]: WebtoonNoInfo;
  };
}

export interface ScrollStorage {
  [webtoonId: number]: {
    [no: number]: number;
  };
}

export interface OrderStorage {
  [key: string]: Array<WebtoonID>;
}

export type FavoriteStorage = Array<WebtoonID>;

/**
 * 웹툰 기록은 sync에 저장될 수 있음
 * sync는 최대 8192 byte라서 데이터 최적화 필요
 */
export type VisitStorage = Array<string>;
