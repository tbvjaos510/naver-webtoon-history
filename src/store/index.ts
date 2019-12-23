import { BrowserStorage } from "./BrowserStore";
import { SettingStorageDefault } from "./setting";
import { SettingStorage, StoreLocation } from "./setting/interface";
import { OrderStorageDefault } from "./webtoon";
import {
  CacheStorage,
  FavoriteStorage,
  OrderStorage,
  ScrollStorage,
  VisitStorage,
  WebtoonStorage
} from "./webtoon/interface";

export const SettingStore = new BrowserStorage<SettingStorage>(
  "setting",
  SettingStorageDefault,
  {
    mergeDefault: true
  }
);
export const WebtoonStore = new BrowserStorage<WebtoonStorage>("webtoon", []);
export const ScrollStore = new BrowserStorage<ScrollStorage>("scroll", {});
export const OrderStore = new BrowserStorage<OrderStorage>(
  "order",
  OrderStorageDefault
);
export const CacheStore = new BrowserStorage<CacheStorage>("cache", {});
export const FavorateStore = new BrowserStorage<FavoriteStorage>(
  "favorate",
  []
);
export const VisitStore = new BrowserStorage<VisitStorage>("visit", []);

SettingStore.init(StoreLocation.SYNC).then(setting => {
  VisitStore.init(setting.storeLocation);
});

WebtoonStore.init(StoreLocation.LOCAL);
ScrollStore.init(StoreLocation.LOCAL);
OrderStore.init(StoreLocation.SYNC);
CacheStore.init(StoreLocation.LOCAL);
FavorateStore.init(StoreLocation.SYNC);
