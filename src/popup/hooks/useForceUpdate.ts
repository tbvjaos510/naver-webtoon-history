import { useCallback, useState } from "react";

export default function useForceUpdate() {
  const [, setValue] = useState(0);
  const handlleForceUpdate = useCallback(() => {
    setValue(value => value + 1);
  }, []);
  return handlleForceUpdate;
}
