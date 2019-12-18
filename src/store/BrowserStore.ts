import { StorageObserverCallback } from "./interface";
import { StoreLocation } from "./setting/interface";
import { getStorage, setStorage } from "./Storage";

interface BrowserStorageOption {
  observeObject?: boolean;
  mergeDefault?: boolean;
}

export class BrowserStorage<T extends {}> {
  public isLoaded = false;
  private storage: StoreLocation = StoreLocation.LOCAL;
  private rawData: T | null = null;
  private readonly observers: Array<StorageObserverCallback<T>> = [];

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

  public constructor(
    public readonly key: string,
    private readonly option?: BrowserStorageOption
  ) {
    chrome.storage.onChanged.addListener(this.onChangeStorage);
  }

  public async init(storage: StoreLocation, defaultValue: T) {
    this.storage = storage;
    const rawData = await getStorage<T>(this.key, storage);
    if (rawData === null) {
      this.data = defaultValue;
    } else {
      if (this.option?.mergeDefault) {
        const mergedData = { ...rawData };
        const defaultKeys = Object.keys(defaultValue);
        const storedKeys = Object.keys(rawData);
        this.data = defaultKeys
          .filter(key => storedKeys.includes(key) === false)
          .reduce(
            (prev, curr) => ({
              ...prev,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              [curr]: (defaultValue as Record<string, any>)[curr]
            }),
            mergedData
          );
      } else {
        this.rawData = rawData;
      }
    }
    this.isLoaded = true;
    this.observers.forEach(observe => observe(this.data, null));
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
    this.observers.splice(
      this.observers.findIndex(observer => observer === callback),
      1
    );
  }
}
