import { StorageObserverCallback } from "./interface";
import { StoreLocation } from "./setting/interface";
import { getStorage, setStorage } from "./Storage";

export class BrowserStorage<T extends {}> {
  public isLoaded = false;
  private storage: StoreLocation = StoreLocation.LOCAL;
  private rawData: T | null = null;
  private observers: Array<StorageObserverCallback<T>> = [];

  private onChangeStorage(
    change: {
      [key: string]: chrome.storage.StorageChange;
    },
    storage: string
  ) {
    if (
      this.storage === storage &&
      change[this.key].newValue !== undefined &&
      change[this.key].newValue !== change[this.key].oldValue
    ) {
      const oldValue = JSON.parse(change[this.key].oldValue);
      const newValue = JSON.parse(change[this.key].newValue);
      this.rawData = newValue;
      this.observers.forEach(observe => observe(newValue, oldValue));
    }
  }

  public constructor(public readonly key: string) {
    chrome.storage.onChanged.addListener(this.onChangeStorage);
  }

  public async init(storage: StoreLocation, defaultValue: T) {
    this.storage = storage;
    this.rawData = await getStorage<T>(this.key, storage);
    if (this.rawData === null) {
      this.data = defaultValue;
    }
    this.isLoaded = true;
    return this.data;
  }

  public set data(value: T) {
    this.rawData = value;
    setStorage(this.key, value, this.storage);
  }

  public get data() {
    if (this.rawData === null) {
      throw Error(`BrowserStorage [${this.key}] is not initialized`);
    }
    return this.rawData;
  }

  public subscribe(callback: StorageObserverCallback<T>) {
    this.observers.push(callback);
  }

  public unsubscribe(callback: StorageObserverCallback<T>) {
    this.observers = this.observers.filter(c => c !== callback);
  }
}
