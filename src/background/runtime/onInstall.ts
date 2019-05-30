import WebtoonStore from "../../store/webtoon";
import OptionStore from "../../store/option";
import migration from "./migration";

export default function(webtoon: WebtoonStore, option: OptionStore) {
  chrome.runtime.onInstalled.addListener(details => {
    console.log(details);
    if (details.reason === "install") {
      console.log("Init Start");
      webtoon.setVisitsFromChrome();
    } else if (details.reason === "update") {
      const currentVersion = chrome.runtime.getManifest().version;
      if (details.previousVersion != currentVersion) {
        console.log("update ", details.previousVersion, currentVersion);
        if (BROWSER === "whale") {
          whale.sidebarAction.setBadgeText({
            text: " "
          });
        } else {
          chrome.browserAction.setBadgeText({
            text: " "
          });
        }
        migration(details.previousVersion, currentVersion);
      }
    }
  });
}
