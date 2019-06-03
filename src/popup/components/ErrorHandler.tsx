import * as React from "react";
import Wlink from "./Wlink";
import { observer, inject } from "mobx-react";
import OptionStore from "../../store/option";

interface IErrorHandlerProps {
  option?: OptionStore;
  children: React.ReactNode;
}

interface IErrorHandlerStates {
  hasError: boolean;
}

@inject("option")
@observer
export default class ErrorHandler extends React.Component<IErrorHandlerProps, IErrorHandlerStates> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
    try {
      window.onerror = (e, url, line) => {
        this.componentDidCatch(e, url);
      };
      if (chrome.extension.getBackgroundPage())
        chrome.extension.getBackgroundPage().window.onerror = (e, url, line) => {
          this.componentDidCatch(e, url);
        };
    } catch (e) {
      this.state = { hasError: true };
    }
  }

  private resetStore() {
    const { resetStore } = this.props.option;
    resetStore("local");
    resetStore("sync");
    setTimeout(chrome.runtime.reload, 500);
  }

  componentDidCatch(error, info) {
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
              <a href="#" onClick={() => this.resetStore()}>
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
