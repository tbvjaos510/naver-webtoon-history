import React, { memo } from "react";

interface Props {
  children: React.ReactNodeArray;
}

const Tabs: React.FC<Props> = props => {
  const { children } = props;

  return (
    <ul className="uk-child-width-expand uk-margin-remove-vertical uk-tab">
      {children}
    </ul>
  );
};

export default memo(Tabs);
