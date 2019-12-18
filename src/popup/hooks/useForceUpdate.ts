import { useCallback, useState } from "react";

export default function useForceUpdate() {
  const [value, setValue] = useState(0);
  const handlleForceUpdate = useCallback(() => {
    setValue(value + 1);
  }, [value]);
  return handlleForceUpdate;
}
