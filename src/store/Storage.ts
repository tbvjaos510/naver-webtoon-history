import { StoreLocation } from "./setting/interface";

export async function getStorage<T>(
  key: string,
  storage: StoreLocation = StoreLocation.LOCAL
) {
  return new Promise<T | null>((resolve, reject) => {
    try {
      chrome.storage[storage].get(key, data => {
        if (data[key] !== undefined) {
          resolve(JSON.parse(data[key]) as T);
        }
        resolve(null);
      });
    } catch (e) {
      reject(e);
    }
  });
}

export function setStorage<T>(
  key: string,
  data: T,
  storage: StoreLocation = StoreLocation.LOCAL
) {
  return chrome.storage[storage].set({ [key]: JSON.stringify(data) });
}
