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
    forceUpdate();
    store.subscribe(handleChangeData);
    return () => {
      store.unsubscribe(handleChangeData);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (store.isLoaded === false) {
    return null;
  }

  return store.data as BrowserStorageData[T];
}
