import OptionStore from "./option";
import WebtoonStore from "./webtoon";

export default class RootStore {
  public option: OptionStore;

  public webtoon: WebtoonStore;

  constructor() {
    this.option = new OptionStore();
    this.webtoon = new WebtoonStore(this.option);

    // Dev Only
    chrome.storage.onChanged.addListener(change => {
      console.log("chrome storage changed", change);
    });
  }
}
