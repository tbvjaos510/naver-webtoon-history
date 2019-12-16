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

export const SettingStore = new BrowserStorage<SettingStorage>("setting");
export const WebtoonStore = new BrowserStorage<WebtoonStorage>("webtoon");
export const ScrollStore = new BrowserStorage<ScrollStorage>("scroll");
export const OrderStore = new BrowserStorage<OrderStorage>("order");
export const CacheStore = new BrowserStorage<CacheStorage>("cache");
export const FavorateStore = new BrowserStorage<FavoriteStorage>("favorate");
export const VisitStore = new BrowserStorage<VisitStorage>("visit");

SettingStore.init(StoreLocation.SYNC, SettingStorageDefault).then(setting => {
  VisitStore.init(setting.storeLocation, []);
});

WebtoonStore.init(StoreLocation.LOCAL, {});
ScrollStore.init(StoreLocation.LOCAL, {});
OrderStore.init(StoreLocation.SYNC, OrderStorageDefault);
CacheStore.init(StoreLocation.LOCAL, {});
FavorateStore.init(StoreLocation.SYNC, []);

export default {
  setting: SettingStore,
  webtoon: WebtoonStore,
  scroll: ScrollStore,
  order: OrderStore,
  cache: CacheStore,
  favorate: FavorateStore,
  visit: VisitStore
};
