import WebtoonStore from "../../popup/store/webtoon";
import OptionStore from "../../popup/store/option";

export default function(webtoon: WebtoonStore, option: OptionStore) {
  chrome.runtime.onInstalled.addListener(details => {
    if (details.reason === "install") {
      console.log("Init Start");
      webtoon.setVisitsFromChrome();
    } else if (details.reason === "update") {
      const currentVersion = chrome.runtime.getManifest().version;
      if (details.previousVersion != currentVersion) {
        chrome.browserAction.setBadgeText({
          text: " "
        });
      }
    }
  });
}
