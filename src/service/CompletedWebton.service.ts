import { NAVER_WEBTOON_URL } from "constraint";
import { OrderBy } from "store/setting/interface";
import Logger from "utils/Logger";

import WebtoonServiceError from "./Error";
import { WebtoonService } from "./interface";

export interface CompletedWebtoonType {
  id: number;
  title: string;
  image: string;
}

interface Argument {
  order: OrderBy;
}

type Result = ReadonlyArray<CompletedWebtoonType>;

function parseCompletedWebtoon(html: string): Result {
  try {
    const webtoons = new DOMParser()
      .parseFromString(html, "text/html")
      .querySelectorAll("ul.img_list>li");
    return Array.from(webtoons).map<CompletedWebtoonType>(element => {
      const url =
        NAVER_WEBTOON_URL +
        element.querySelector("dl>dt>a")?.getAttribute("href");
      const titleId = new URL(url).searchParams.get("titleId");
      if (!titleId) {
        Logger.warn("completeWebtoon ID 못찾음", { url });
      }
      return {
        id: parseInt(titleId ?? "0"),
        image:
          element.querySelector("div.thumb img")?.getAttribute("src") ?? "",
        title: element.querySelector("dl>dt>a")?.getAttribute("title") ?? ""
      };
    });
  } catch (error) {
    throw new WebtoonServiceError("CompletedWebtoon Parsing 실패", { error });
  }
}

const FetchCompletedWebtoon: WebtoonService<Argument, Result> = async ({
  order = OrderBy.TITLE
}) => {
  const url = `${NAVER_WEBTOON_URL}/webtoon/finish.nhn?order=${order}`;
  const { text, status } = await fetch(url);

  if (status !== 200) {
    throw new WebtoonServiceError("CompletedWebtoon 요청 실패", {
      url,
      code: status
    });
  }

  const html = await text();
  return parseCompletedWebtoon(html);
};

export default FetchCompletedWebtoon;
