import useClassNames from "popup/hooks/useClassNames";
import React, { memo } from "react";

import { UKColor, UKSize } from "../interface";

interface Props {
  color: UKColor | "link";
  size: UKSize;
}

const Button: React.FC<Props> = props => {
  const { children, color, size } = props;

  const buttonClassName = useClassNames(
    "uk-button",
    `uk-button-${color}`,
    `uk-button-${size}`
  );

  return <button className={buttonClassName}>{children}</button>;
};

Button.defaultProps = {
  color: UKColor.PRIMARY,
  size: UKSize.SMALL
};

export default memo(Button);
