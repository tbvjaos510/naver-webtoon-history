import Tabs from "popup/components/Tabs";
import Tab from "popup/components/Tabs/Tab";
import React from "react";
import { useLocation } from "react-router";

export interface RouteInfo {
  readonly name: string;
  readonly path: string;
}

interface Props {
  routes: Array<RouteInfo>;
}

const RouteTab: React.FC<Props> = props => {
  const { routes } = props;
  const { pathname } = useLocation();

  return (
    <Tabs value={pathname}>
      {routes.map(route => (
        <Tab key={route.path} label={route.name} value={route.path} />
      ))}
    </Tabs>
  );
};

export default RouteTab;
