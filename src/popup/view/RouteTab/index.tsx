import Tabs from "popup/components/Tabs";
import LinkTab from "popup/components/Tabs/Tab";
import React from "react";
import { useLocation } from "react-router";

export interface RouteInfo {
  readonly name: string;
  readonly path: string;
  readonly component: React.ComponentType;
}

interface Props {
  routes: Array<RouteInfo>;
}

const RouteTab: React.FC<Props> = props => {
  const { routes } = props;
  const { pathname } = useLocation();
  return (
    <Tabs>
      {routes.map(route => (
        <LinkTab
          key={route.path}
          label={route.name}
          value={route.path}
          active={pathname.includes(route.path)}
        />
      ))}
    </Tabs>
  );
};

export default RouteTab;
