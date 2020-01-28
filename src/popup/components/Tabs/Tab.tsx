import classNames from "classnames";
import React, { memo } from "react";
import { Link } from "react-router-dom";

interface Props {
  label: string;
  value: string;
  active?: boolean;
}

const LinkTab: React.FC<Props> = props => {
  const { label, value, active } = props;
  return (
    <li className={classNames({ "uk-active": active })}>
      <Link to={value}>{label}</Link>
    </li>
  );
};

export default memo(LinkTab);
