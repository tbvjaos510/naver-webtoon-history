import { useCallback, useEffect } from "react";
import Storage from "store";
import { BrowserStorageData } from "store/interface";

import useForceUpdate from "./useForceUpdate";

export default function useStore<T extends keyof BrowserStorageData>(
  key: T
): BrowserStorageData[T] | null {
  const store = Storage[key];
  const forceUpdate = useForceUpdate();
  const handleChangeData = useCallback(() => {
    forceUpdate();
  }, [forceUpdate]);

  useEffect(() => {
    store.subscribe(handleChangeData);

    return () => {
      store.unsubscribe(handleChangeData);
    };
  });

  if (store.isLoaded === false) {
    return null;
  }

  return store.data as BrowserStorageData[T];
}
