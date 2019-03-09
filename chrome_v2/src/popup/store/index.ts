import OptionStore from './option';
import WebtoonStore from './webtoon';

export default class RootStore {
  public option: OptionStore;

  public webtoon: WebtoonStore;

  private saveToStore(key: string, value: JSON): void {
    chrome.storage[this.option.storeLocation].set({
      [key]: value,
    });
  }

  constructor() {
    this.option = new OptionStore();
    this.webtoon = new WebtoonStore(this.saveToStore);
  }
}
