import OptionStore from "./option";
import WebtoonStore from "./webtoon";

export default class RootStore {
  public webtoon: WebtoonStore;
  public option: OptionStore;

  constructor(isBackground: boolean, onLoad?: () => void) {
    this.option = new OptionStore(isBackground);
    this.webtoon = new WebtoonStore(this.option, onLoad);

    // Dev Only
    // chrome.storage.onChanged.addListener((change, area) => {
    //   console.log("chrome storage changed", area, change);
    // });
  }
}
