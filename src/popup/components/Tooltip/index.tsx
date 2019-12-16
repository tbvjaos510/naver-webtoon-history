import React, { cloneElement, memo, useMemo } from "react";

interface Props {
  text: string;
  children: React.ReactElement;
}

const Tooltip: React.FC<Props> = props => {
  const { text, children } = props;
  return useMemo(() => cloneElement(children, { "data-uk-tooltip": text }), [
    children,
    text
  ]);
};
export default memo(Tooltip);
