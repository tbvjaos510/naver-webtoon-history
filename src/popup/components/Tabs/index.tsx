import React, { memo } from "react";

import useUIkitOption from "../hooks/useUIkitOption";

interface Props {
  value: string;
  children: React.ReactNodeArray;
}

const Tabs: React.FC<Props> = props => {
  const { children } = props;
  const tabOption = useUIkitOption({
    animation: false
  });

  return (
    <ul
      className="uk-child-width-expand uk-margin-remove-vertical"
      uk-tab={tabOption}
    >
      {children}
    </ul>
  );
};

export default memo(Tabs);
