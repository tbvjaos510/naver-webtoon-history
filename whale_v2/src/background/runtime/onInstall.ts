import WebtoonStore from "../../store/webtoon";
import OptionStore from "../../store/option";
import migration from "./migration";
import { addLinkContext } from "../contextMenu";

export default function(webtoon: WebtoonStore, option: OptionStore) {
  whale.runtime.onInstalled.addListener(details => {
    addLinkContext();

    console.log(details);
    if (details.reason === "install") {
      console.log("Init Start");
      webtoon.setVisitsFromChrome();
    } else if (details.reason === "update") {
      const currentVersion = whale.runtime.getManifest().version;
      if (details.previousVersion != currentVersion) {
        console.log(details.previousVersion, currentVersion);
        migration(details.previousVersion, currentVersion);
      }
    }
  });
}
