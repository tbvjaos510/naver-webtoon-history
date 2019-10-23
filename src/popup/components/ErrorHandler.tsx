import { inject, observer } from 'mobx-react';
import * as React from 'react';

import OptionStore from '../../store/option';
import Wlink from './Wlink';

export interface IErrorHandlerProps {
  option?: OptionStore;
  children: React.ReactNode;
}

export interface IErrorHandlerStates {
  hasError: boolean;
}

@inject("option")
@observer
export default class ErrorHandler extends React.Component<IErrorHandlerProps, IErrorHandlerStates> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
    window.onerror = (e, url) => {
      this.componentDidCatch(e, url);
    };

    if (chrome.extension.getBackgroundPage())
      chrome.extension.getBackgroundPage().window.onerror = (e, url, line) => {
        this.componentDidCatch(e, url);
      };
  }

  private resetStore() {
    const { resetStore } = this.props.option;
    resetStore("local");
    resetStore("sync");
    setTimeout(chrome.runtime.reload, 500);
  }

  componentDidCatch(error, info) {
    ga("send", "exception", {
      exDescription: (error && (error.message || error)) || "unknown"
    });
    this.setState({ hasError: true });
    console.log(error, info);
  }

  render() {
    return (
      <React.Fragment>
        {this.state.hasError ? (
          <div
            className="uk-alert-danger uk-position-absolute uk-position-z-index uk-width-1-1"
            uk-alert=""
          >
            <a
              className="uk-alert-close"
              uk-close=""
              onClick={() => this.setState({ hasError: false })}
            />
            <p>
              페이지 오류가 발생하였습니다. <br />
              만약 새로고침을 해도 똑같은 현상이 발생한다면{" "}
              <Wlink
                forceTab={true}
                link="https://store.chrome.naver.com/detail/nmambboikkfejkgloppiejnhhohbaaem"
              >
                <a href="#">오류신고</a>
              </Wlink>
              나{" "}
              <a
                href="#"
                onClick={() => {
                  ga("send", "event", "popup", "resetStore");
                  this.resetStore();
                }}
              >
                데이터 초기화
              </a>
              를 해주시기 바랍니다.
            </p>
          </div>
        ) : null}
        {this.props.children}
      </React.Fragment>
    );
  }
}
