import Link from "../link";

export const CONTEXT_MENU_ID_SIDEBAR = "OPEN_IN_SIDEBAR";
export const CONTEXT_MENU_ID_TAB = "OPEN_IN_TAB";

export function removeContext(callback: () => void) {
  chrome.contextMenus.removeAll(callback);
}

export function addLinkContext() {
  removeContext(() => {
    chrome.contextMenus.create({
      id: CONTEXT_MENU_ID_TAB,
      contexts: ["link"],
      title: "팝업창에서 웹툰 보기",
      targetUrlPatterns: [
        "https://comic.naver.com/webtoon/list.nhn?titleId*",
        "https://comic.naver.com/webtoon/detail.nhn?titleId*"
      ]
    });
    chrome.contextMenus.create({
      id: CONTEXT_MENU_ID_SIDEBAR,
      contexts: ["link"],
      title: "사이드바에서 웹툰 보기",
      targetUrlPatterns: [
        "https://comic.naver.com/webtoon/list.nhn?titleId*",
        "https://comic.naver.com/webtoon/detail.nhn?titleId*"
      ]
    });
    chrome.contextMenus.onClicked.addListener(info => {
      if (info.menuItemId === CONTEXT_MENU_ID_SIDEBAR) {
        Link.openSidebar(info.linkUrl);
      }
      if (info.menuItemId === CONTEXT_MENU_ID_TAB) {
        Link.openPopup(info.linkUrl);
      }
    });
  });
}