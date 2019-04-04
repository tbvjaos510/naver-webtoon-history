import axios from "axios";
import { WebtoonOrder } from "../store/option";

export interface ogInfo {
  title?: string;
  img?: string;
}

export interface WebtoonInfoType {
  title?: string;
  link?: string;
  img?: string;
  isUp?: boolean;
  isRest?: boolean;
  id?: number;
}

export type Week = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

export interface WebtoonInfo {
  [key: string]: Array<WebtoonInfoType>;
}

export const weekDay: Week[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

export default class WebtoonRequest {
  /**
   * 페이지의 사진, 타이틀을 불러옵니다.
   * @param type 웹툰 타입
   * @param key1 웹툰 번호
   * @param key2 회차 번호
   */
  static async getOpenGraph(type: string, key1: number, key2: number): Promise<ogInfo> {
    const og: ogInfo = {};
    const url = `https://comic.naver.com${type}/detail.nhn?titleId=${key1}&no=${key2}`;
    const { data } = await axios.get<string>(url);
    og.title = data.match(
      /<meta [^>]*property=[\"']og:description[\"'] [^>]*content=[\"']([^'^\"]+?)[\"'][^>]*>/
    )[1];
    og.img = data.match(
      /<meta [^>]*property=[\"']og:image[\"'] [^>]*content=[\"']([^'^\"]+?)[\"'][^>]*>/
    )[1];

    if (og.title && og.img && og.img.match("https://shared-comic.pstatic.net/thumb/")) return og;

    console.log(`OpenGraph get failed.`, url, og);
    return null;
  }

  static async getAllWebtoon(sort: WebtoonOrder): Promise<WebtoonInfo> {
    const link = `https://comic.naver.com/webtoon/weekday.nhn?order=${sort}`;
    const { data } = await axios.get(link);
    if (!data) {
      console.log(`request:${link} Error`);
      return null;
    }
    const webtoons: WebtoonInfo = {};
    const page = new DOMParser().parseFromString(data, "text/html").querySelector("div.daily_all");
    weekDay.forEach(day => {
      const dayElement = page.querySelector("h4." + day).parentElement.querySelectorAll("ul>li");
      webtoons[day] = [];
      dayElement.forEach(element => {
        const webtoon: WebtoonInfoType = {};
        const toonElement: HTMLLinkElement = element.querySelector("div.thumb>a");
        const imgElement: HTMLImageElement = element.querySelector("div.thumb>a>img");
        const url = new URL(toonElement.href);
        webtoon.img = imgElement.src;
        webtoon.title = imgElement.title;
        webtoon.link = `https://comic.naver.com${url.pathname + url.search}`;
        webtoon.isRest = !!toonElement.querySelector("em.ico_break");
        webtoon.isUp = !!toonElement.querySelector("em.ico_updt");
        webtoon.id = parseInt(url.searchParams.get("titleId"));
        webtoons[day].push(webtoon);
      });
    });
    return webtoons;
  }
}
