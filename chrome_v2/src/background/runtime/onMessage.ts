import WebtoonStore from "../../popup/store/webtoon";
import OptionStore from "../../popup/store/option";
import { ChromeMessage } from "../../../@types/commend";

export default function(webtoon: WebtoonStore, option: OptionStore) {
  chrome.runtime.onMessage.addListener((message: ChromeMessage, sender, response) => {
    const param = new URL(sender.url).searchParams;
    const wid = param.get("titleId");
    const no = param.get("no");
    if (message && message.command === "openTab") {
      const link = sender.url.replace("m.comic", "comic");
      // Force Tab
      chrome.tabs.create({
        url: link
      });
      // option.openTab(link);
      response(null);
    } else if (wid && no && message.scroll && option.saveScroll) {
      message.scroll = Math.round(message.scroll * 100);
      if (message.scroll <= 2 || message.scroll >= 98) {
        if (webtoon.scrolls[wid] && webtoon.scrolls[wid][no]) {
          delete webtoon.scrolls[wid][no];
          if (Object.keys(webtoon.scrolls[wid]).length == 0) {
            delete webtoon.scrolls[wid];
          }
        }
        webtoon.scrolls = webtoon.scrolls;
        return;
      }
      if (!webtoon.scrolls[wid]) {
        webtoon.scrolls[wid] = {};
      }
      webtoon.scrolls[wid][no] = message.scroll;
      // Save to Store
      webtoon.scrolls = webtoon.scrolls;
    } else if (message && message.command === "reload") {
      location.reload();
    }
  });
}
