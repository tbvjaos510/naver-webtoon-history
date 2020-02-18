import { WEBTOON_ROUTE } from "constraint";
import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import styled from "styled-components";

import ContextProvider from "./context";
import RecentWebtoon from "./pages/recent";
import Setting from "./pages/setting";
import WebtoonList from "./pages/webtoon";
import Header from "./view/Header";
import RouteTab, { RouteInfo } from "./view/RouteTab";

const Container = ENV === "production" ? React.Fragment : React.StrictMode;

const routes: Array<RouteInfo> = [
  {
    name: "웹툰 목록",
    path: WEBTOON_ROUTE,
    component: WebtoonList
  },
  {
    name: "최근 본 웹툰",
    path: "/recent",
    component: RecentWebtoon
  },
  {
    name: "설정",
    path: "/setting",
    component: Setting
  }
];

const App: React.FC = () => {
  return (
    <Container>
      <ContextProvider>
        <HashRouter>
          <FlexBox>
            <Header />
            <RouteTab routes={routes} />
            <Switch>
              <Route path="/" component={routes[0].component} exact />
              {routes.map(route => (
                <Route
                  path={route.path}
                  key={route.path}
                  component={route.component}
                />
              ))}
            </Switch>
          </FlexBox>
        </HashRouter>
      </ContextProvider>
    </Container>
  );
};

export default App;

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
`;
