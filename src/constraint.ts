import { Day } from "store/webtoon/interface";

export const NAVER_WEBTOON_URL = "https://comic.naver.com/";
export const DAY_LIST: ReadonlyArray<I18N_KEY> = [
  "DAY_SUN",
  "DAY_MON",
  "DAY_TUE",
  "DAY_WED",
  "DAY_THU",
  "DAY_FRI",
  "DAY_SAT"
];

export const DAYS: Array<Day> = [
  Day.SUN,
  Day.MON,
  Day.TUE,
  Day.WED,
  Day.THU,
  Day.FRI,
  Day.SAT
];

export const WEBTOON_ROUTE = "/webtoon";
