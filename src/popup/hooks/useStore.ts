import { useCallback, useEffect } from "react";
import { BrowserStorage } from "store/BrowserStore";

import useForceUpdate from "./useForceUpdate";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function useStore<T extends BrowserStorage<any>>(store: T): T {
  const forceUpdate = useForceUpdate();
  const handleChangeData = useCallback(() => {
    forceUpdate();
  }, []);

  useEffect(() => {
    store.subscribe(handleChangeData);
    return () => {
      store.unsubscribe(handleChangeData);
    };
  }, [handleChangeData]);

  return store;
}
