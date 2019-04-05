import OptionStore from "./option";
import WebtoonStore from "./webtoon";

export default class RootStore {
  public webtoon: WebtoonStore;
  public option: OptionStore;

  constructor(isBackground: boolean) {
    this.option = new OptionStore(isBackground);
    this.webtoon = new WebtoonStore(this.option);

    // Dev Only
    chrome.storage.onChanged.addListener(change => {
      console.log("chrome storage changed", change);
    });
  }
}
