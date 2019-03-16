import axios from "axios";
import { WebtoonOrder } from "../store/option";

export interface ogInfo {
  title?: string;
  img?: string;
}

export interface WebtoonType {
  title?: string;
  link?: string;
  img?: string;
  isUp?: boolean;
  isRest?: boolean;
}

export interface WebtoonInfo {
  [key: string]: WebtoonType[];
}

export type Week = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

export const weekDay: Week[] = [
  "mon",
  "tue",
  "wed",
  "thu",
  "fri",
  "sat",
  "sun"
];

export default class WebtoonRequest {
  static async getOpenGraph(url: string): Promise<ogInfo> {
    const og: ogInfo = {};
    const { data } = await axios.get(url);
    og.title = (<string>data).match(
      /<meta [^>]*property=[\"']og:description[\"'] [^>]*content=[\"']([^'^\"]+?)[\"'][^>]*>/
    )[1];
    og.img = (<string>data).match(
      /<meta [^>]*property=[\"']og:image[\"'] [^>]*content=[\"']([^'^\"]+?)[\"'][^>]*>/
    )[1];

    if (
      og.title &&
      og.img &&
      og.img.match("https://shared-comic.pstatic.net/thumb/")
    )
      return og;
    console.warn(`OpenGraph get error.`, og);
    return null;
  }

  static async getAllWebtoon(sort: WebtoonOrder): Promise<WebtoonInfo> {
    const link = `https://comic.naver.com/webtoon/weekday.nhn?order=${sort}`;
    const { data } = await axios.get(link);
    if (!data) {
      console.warn(`request:${link} Error`);
      return null;
    }
    const webtoons: WebtoonInfo = {};
    const page = new DOMParser()
      .parseFromString(data, "text/html")
      .querySelector("div.daily_all");
    weekDay.forEach(day => {
      const dayElement = page
        .querySelector("h4." + day)
        .parentElement.querySelectorAll("ul>li");
      webtoons[day] = [];
      dayElement.forEach(element => {
        const webtoon: WebtoonType = {};
        const toonElement: HTMLLinkElement = element.querySelector(
          "div.thumb>a"
        );
        const imgElement: HTMLImageElement = element.querySelector(
          "div.thumb>a>img"
        );
        webtoon.img = imgElement.src;
        webtoon.title = imgElement.title;
        webtoon.link = `https://comic.naver.com/${toonElement.href}`;
        webtoon.isRest = !!toonElement.querySelector("em.ico_break");
        webtoon.isUp = !!toonElement.querySelector("em.ico_updt");
        webtoons[day].push(webtoon);
      });
    });
    return webtoons;
  }
}