import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";

import Setting from "./pages/setting";
import WebtoonList from "./pages/webtoon";
import Header from "./view/Header";
import RouteTab, { RouteInfo } from "./view/RouteTab";

const Container = ENV === "production" ? React.Fragment : React.StrictMode;

const routes: Array<RouteInfo> = [
  {
    name: "웹툰 목록",
    path: "/"
  },
  {
    name: "최근 본 웹툰",
    path: "/recent"
  },
  {
    name: "설정",
    path: "/setting"
  }
];

const App: React.FC = () => {
  return (
    <Container>
      <HashRouter>
        <Header />
        <RouteTab routes={routes} />
        <Switch>
          <Route path="/" exact component={WebtoonList} />
          <Route path="/recent" />
          <Route path="/setting" component={Setting} />
        </Switch>
      </HashRouter>
    </Container>
  );
};

export default App;
