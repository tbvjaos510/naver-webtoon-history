import { UKColor } from "popup/components/interface";

export function isUKColor(color: UKColor | string): color is UKColor {
  return (
    color === UKColor.DANGER ||
    color === UKColor.DEFAULT ||
    color === UKColor.PRIMARY ||
    color === UKColor.SECONDARY
  );
}
