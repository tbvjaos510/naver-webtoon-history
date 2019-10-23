import OptionStore from '../../store/option';
import WebtoonStore from '../../store/webtoon';
import migration from './migration';

export default function(webtoon: WebtoonStore, option: OptionStore) {
  chrome.runtime.onInstalled.addListener(details => {
    console.log(details);

    if (details.reason === "install") {
      console.log("Init Start");
      ga("send", "event", "extension", "install", BROWSER);
      webtoon.setVisitsFromChrome();
    } else if (details.reason === "update") {
      const currentVersion = chrome.runtime.getManifest().version;
      ga("send", "event", {
        eventCategory: "extension",
        eventAction: "update",
        eventLabel: `${details.previousVersion}>${currentVersion} (${BROWSER})`
      });
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
