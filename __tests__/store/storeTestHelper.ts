import WebtoonStore from "../../src/store/webtoon";
import OptionStore from "../../src/store/option";

export function getWebtoonStore(): WebtoonStore {
  return new WebtoonStore();
}

export function getOptionStore(): OptionStore {
  return new OptionStore();
}
