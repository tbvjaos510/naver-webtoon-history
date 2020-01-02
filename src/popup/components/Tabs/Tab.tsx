import React, { memo } from "react";
import { Link } from "react-router-dom";

interface Props {
  label: string;
  value: string;
}

const Tab: React.FC<Props> = props => {
  const { label, value } = props;
  return (
    <li>
      <Link to={value}>{label}</Link>
    </li>
  );
};

export default memo(Tab);
