import * as React from "react";
import { Provider } from "mobx-react";
import "./Popup.scss";

// Store Import
import Store from "./store";

import Wlink from "./components/wlink";
import Switcher from "./components/switcher";
import { Tabs } from "./Tabs";

const store = new Store(false);

export default class App extends React.Component {
  render() {
    return (
      <Provider {...store}>
        <div>
          <div className="body-title">
            <Wlink link="https://comic.naver.com/webtoon/weekday.nhn">
              <span style={{ cursor: "pointer" }}>
                네이버 웹툰 도우미{" "}
                <span className="uk-text-small option-title" style={{ color: "lightgray" }}>
                  {chrome.runtime.getManifest().version}
                </span>
              </span>
            </Wlink>
          </div>
          <Switcher webtoonComponents={Tabs.webtoonComponents} />
        </div>
      </Provider>
    );
  }
}
