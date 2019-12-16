import { SettingStorage } from "./setting/interface";
import {
  CacheStorage,
  FavoriteStorage,
  OrderStorage,
  ScrollStorage,
  VisitStorage,
  WebtoonStorage
} from "./webtoon/interface";

export interface BrowserStorageData {
  setting: SettingStorage;
  webtoon: WebtoonStorage;
  scroll: ScrollStorage;
  order: OrderStorage;
  cache: CacheStorage;
  favorate: FavoriteStorage;
  visit: VisitStorage;
}

export type StorageObserverCallback<T> = (newValue: T, oldValue: T) => void;
