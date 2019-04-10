import WebtoonStore from "../popup/store/webtoon";
import OptionStore from "../popup/store/option";

export default function(webtoon: WebtoonStore, option: OptionStore) {
  let contextId: number;
  function removeContext() {
    chrome.contextMenus.remove(contextId);
  }
  function addFavorateContext() {
    chrome.contextMenus.create({
      id: "naver-webtoon-extension-favorate",
      contexts: ["link"],
      onclick() {},
      title: "즐겨찾기에 추가"
    });
  }
}