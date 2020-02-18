import { NAVER_WEBTOON_URL } from "constraint";
import { WebtoonType } from "store/webtoon/interface";

import WebtoonServiceError from "./Error";
import { WebtoonService } from "./interface";

export interface EpisodeType {
  title: string;
  image: string;
}

interface Argument {
  webtoonType: WebtoonType;
  webtoonId: number;
  episode: number;
}

function getWebtoonType(type: WebtoonType) {
  switch (type) {
    case WebtoonType.BEST_CHALLENGE:
      return "bestChallenge";
    case WebtoonType.CHALLENGE:
      return "challenge";
    case WebtoonType.WEBTOON:
      return "webtoon";
  }
}

const FetchEpisodeDetail: WebtoonService<Argument, EpisodeType> = async ({
  webtoonType,
  webtoonId,
  episode
}) => {
  const url = `${NAVER_WEBTOON_URL}/${getWebtoonType(
    webtoonType
  )}/detail.nhn?titleId=${webtoonId}&no=${episode}`;
  const { text, status } = await fetch(url);

  if (status !== 200) {
    throw new WebtoonServiceError("CompletedWebtoon 요청 실패", {
      url,
      code: status
    });
  }

  const html = await text();

  const title = html.match(
    /og:description[\"'] [^>]*content=[\"']([^'^\"]+?)[\"'][^>]*>/
  )?.[1];
  const image = html.match(
    /og:image[\"'] [^>]*content=[\"']([^'^\"]+?)[\"'][^>]*>/
  )?.[1];

  if (!title || !image) {
    throw new WebtoonServiceError("[EpisodeDetail] OG태그 해석 실패", {
      title,
      image,
      url
    });
  }
  return {
    title,
    image
  };
};

export default FetchEpisodeDetail;
