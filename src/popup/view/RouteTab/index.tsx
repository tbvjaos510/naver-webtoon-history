import { makeStyles, Tab, Tabs } from "@material-ui/core";
import React, { memo, useCallback } from "react";
import { useHistory, useLocation } from "react-router";

export interface RouteInfo {
  readonly name: string;
  readonly path: string;
}

interface Props {
  routes: Array<RouteInfo>;
}

const useStyles = makeStyles({
  tabs: {
    width: "100%"
  }
});

const RouteTab: React.FC<Props> = props => {
  const { routes } = props;

  const { push } = useHistory();
  const { pathname } = useLocation();
  const classes = useStyles();

  const redirect = useCallback(
    (_, value) => {
      push(value);
    },
    [push]
  );
  return (
    <Tabs
      className={classes.tabs}
      value={pathname}
      variant="fullWidth"
      onChange={redirect}
      indicatorColor="primary"
    >
      {routes.map(route => (
        <Tab key={route.path} label={route.name} value={route.path} />
      ))}
    </Tabs>
  );
};

export default memo(RouteTab);
