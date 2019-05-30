import WebtoonStore, { VisitType } from "../../store/webtoon";
import OptionStore from "../../store/option";
import * as Utility from "./utility";

export default function(webtoon: WebtoonStore, option: OptionStore) {
  chrome.tabs.onUpdated.addListener((tabId, info, tab) => {
    if (info.status && info.status === "complete") {
      const url = new URL(tab.url);
      if (url.host === "comic.naver.com") {
        // 회차 리스트 페이지
        if (url.pathname.indexOf("/list.nhn") > 0) {
          const webtoonId = url.searchParams.get("titleId");
          Utility.displayHistory(
            tabId,
            webtoonId,
            webtoon.visits,
            option.showHistory
          );
        }
        // 웹툰 보는 페이지
        else if (url.pathname.indexOf("/detail.nhn") > 0) {
          const webtoonId = url.searchParams.get("titleId");
          const no = url.searchParams.get("no");
          console.log(url);
          if (!webtoonId || !no) {
            return;
          }
          if (!webtoon.webtoonType[webtoonId]) {
            webtoon.visits[webtoonId] = {};
            webtoon.webtoonType[webtoonId] = {
              title: tab.title.split("::")[0].trim(),
              type: url.pathname.split("/detail.nhn")[0]
            };
          }
          console.log(webtoonId, no);
          webtoon.visits[webtoonId][no] = Math.floor(
            new Date().getTime() / 1000
          );
          if (option.saveScroll) {
            Utility.checkScroll(tabId, false);
          }
          if (webtoon.scrolls[webtoonId] && webtoon.scrolls[webtoonId][no]) {
            Utility.setScroll(
              tabId,
              webtoon.scrolls[webtoonId][no],
              false,
              option.scrollAlert
            );
          }
          if (option.autoNext) {
            console.log("autonext");
            Utility.autoNext(tabId, option.autoNext);
          }
          if (option.hiddenComment) Utility.hiddenComment(tabId, false);

          // Save to Store
          webtoon.webtoonType = webtoon.webtoonType;
          webtoon.visits = webtoon.visits;
        }
      }
    }
  });
}
