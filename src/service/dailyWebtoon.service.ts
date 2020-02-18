import { DAYS, NAVER_WEBTOON_URL } from "constraint";
import { OrderBy } from "store/setting/interface";
import { Day } from "store/webtoon/interface";
import Logger from "utils/Logger";

import WebtoonServiceError from "./Error";
import { WebtoonService } from "./interface";

interface Argument {
  order: OrderBy;
}

export interface DailyWebtoonType {
  title: string;
  image: string;
  url: string;
  isUploaded: boolean;
  isRest: boolean;
  id: number;
}

export type DailyWebtoonResult = {
  [key in Day]: ReadonlyArray<DailyWebtoonType>;
};

function parseDailyWebtoon(html: string): DailyWebtoonResult {
  try {
    const page = new DOMParser()
      .parseFromString(html, "text/html")
      .querySelector("div.daily_all");

    if (!page) {
      throw new Error("DailyWebtoon DOMParser 실패");
    }
    return DAYS.reduce((prev, day) => {
      const dayElements = page
        .querySelector(`h4.${day}`)
        ?.parentElement?.querySelectorAll("ul>li");

      return {
        ...prev,
        [day]: dayElements
          ? Array.from(dayElements)
              .map<DailyWebtoonType | null>(element => {
                const webtoonElement = element.querySelector("div.trumb>a");
                const imageElement = element.querySelector("div.trumb>a>img");
                if (!webtoonElement || !imageElement) {
                  Logger.warn(
                    "DailyWebtoon webtoonElement, imageElement 못찾음",
                    { webtoonElement, imageElement }
                  );
                  return null;
                }
                const url = new URL(webtoonElement.getAttribute("href") ?? "");
                return {
                  id: parseInt(url.searchParams.get("titleId") ?? "0"),
                  image: imageElement.getAttribute("src") ?? "",
                  isRest: !!webtoonElement.querySelector("em.ico_break"),
                  isUploaded: !!webtoonElement.querySelector("em.ico_updt"),
                  title: imageElement.getAttribute("title") ?? "",
                  url: NAVER_WEBTOON_URL + url.pathname + url.search
                };
              })
              .filter(_ => _)
          : []
      };
    }, {} as DailyWebtoonResult);
  } catch (error) {
    throw new WebtoonServiceError("DailyWebtoon Parsing 실패", error);
  }
}

const FetchDailyWebtoon: WebtoonService<
  Argument,
  DailyWebtoonResult
> = async arg => {
  const { order } = arg;
  const url = `${NAVER_WEBTOON_URL}/webtoon/weekday.nhn?order=${order}`;
  const { text, status } = await fetch(url);

  if (status !== 200) {
    throw new WebtoonServiceError("DailyWebtoon 요청 실패", {
      url,
      code: status
    });
  }

  const html = await text();
  return parseDailyWebtoon(html);
};

export default FetchDailyWebtoon;
