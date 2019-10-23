import { Provider } from 'mobx-react';
import * as React from 'react';

import Store from '../store';
import ErrorHandler from './components/ErrorHandler';
import Switcher from './components/Switcher';
import UpdateCheck from './components/UpdateCheck';
import Wlink from './components/Wlink';
import { Tabs } from './Tabs';

// Store Import
const store = new Store(false);

export default class App extends React.Component {
  componentDidMount() {
    ga("send", "pageview");
  }

  render() {
    return (
      <Provider {...store}>
        <ErrorHandler>
          <UpdateCheck>
            <div>
              <div className="body-title">
                <Wlink link="https://comic.naver.com/webtoon/weekday.nhn">
                  <span style={{ cursor: "pointer" }}>
                    네이버 웹툰 도우미{" "}
                    <span className="uk-text-small option-title" style={{ color: "lightgray" }}>
                      {chrome.runtime.getManifest().version}
                      {ENV === "development" && "-dev"}
                    </span>
                  </span>
                </Wlink>
              </div>
              <Switcher webtoonComponents={Tabs.webtoonComponents} />
            </div>
          </UpdateCheck>
        </ErrorHandler>
      </Provider>
    );
  }
}
