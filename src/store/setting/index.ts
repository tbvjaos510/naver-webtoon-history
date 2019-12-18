import {
  LinkTarget,
  OrderBy,
  SettingStorage,
  StoreLocation
} from "./interface";

export const SettingStorageDefault: SettingStorage = {
  autoNext: false,
  hiddenComment: false,
  linkTarget: LinkTarget.TAB,
  orderBy: OrderBy.VIEW_COUNT,
  saveFavorate: true,
  saveScroll: true,
  saveWebtoonSort: true,
  showFavorate: true,
  scrollAlert: true,
  showHistory: true,
  storeLocation: StoreLocation.LOCAL,
  useContextMenu: true,
  useImageLog: true
};
