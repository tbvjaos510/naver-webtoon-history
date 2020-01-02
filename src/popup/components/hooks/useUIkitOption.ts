import { useMemo } from "react";

type UIkitOption = Record<string, string | number | boolean>;

export default function useUIkitOption(option: UIkitOption) {
  return useMemo(
    () =>
      Object.keys(option)
        .map(key => `${key}:${option[key]}`)
        .join(";"),
    [JSON.stringify(option)]
  );
}
