import Link from "../link";
import WebtoonStore from "../../store/webtoon";

export const CONTEXT_MENU_ID_SIDEBAR = "OPEN_IN_SIDEBAR";
export const CONTEXT_MENU_ID_TAB = "OPEN_IN_TAB";
export const CONTEXT_MENU_ID_FAVORATE = "ADD_TO_FAVORATE";

export const webtoonUrls = [
  "https://comic.naver.com/webtoon/list.nhn?titleId*",
  "https://comic.naver.com/webtoon/detail.nhn?titleId*"
];

export function removeContext(callback: () => void) {
  chrome.contextMenus.removeAll(callback);
}

export function addLinkContext() {
  removeContext(() => {
    chrome.contextMenus.create({
      id: CONTEXT_MENU_ID_TAB,
      contexts: ["link"],
      title: "팝업창에서 웹툰 보기",
      targetUrlPatterns: webtoonUrls
    });
    chrome.contextMenus.create({
      id: CONTEXT_MENU_ID_FAVORATE,
      contexts: ["link"],
      title: "즐겨찾기에 웹툰 추가",
      targetUrlPatterns: webtoonUrls
    });
    if (BROWSER === "whale") {
      chrome.contextMenus.create({
        id: CONTEXT_MENU_ID_SIDEBAR,
        contexts: ["link"],
        title: "사이드바에서 웹툰 보기",
        targetUrlPatterns: webtoonUrls
      });
    }
  });
}

export function addContextClickListener(webtoon: WebtoonStore) {
  chrome.contextMenus.onClicked.addListener(info => {
    switch (info.menuItemId) {
      case CONTEXT_MENU_ID_SIDEBAR:
        Link.openSidebar(info.linkUrl);
        break;
      case CONTEXT_MENU_ID_TAB:
        Link.openPopup(info.linkUrl);
        break;
      case CONTEXT_MENU_ID_FAVORATE:
        const url = new URL(info.linkUrl);
        const titleId = url.searchParams.get("titleId");
        if (webtoon.starWebtoons.indexOf(parseInt(titleId)) > -1) {
          chrome.tabs.executeScript({
            frameId: info.frameId,
            code: `alert("[Naver Webtoon Extention] 이미 즐겨찾기에 존재합니다.");`
          });
        } else {
          webtoon.starWebtoons.push(parseInt(titleId));
          webtoon.starWebtoons = webtoon.starWebtoons;
          chrome.tabs.executeScript({
            frameId: info.frameId,
            code: `alert("[Naver Webtoon Extention] 즐겨찾기에 추가하였습니다.");`
          });
        }
        break;
    }
  });
}
