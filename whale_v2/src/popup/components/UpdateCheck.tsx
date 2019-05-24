import * as React from "react";
import Wlink from "./wlink";
import axios from "axios";

export interface IUpdateCheckProps {
  children: React.ReactNode;
}
export interface IUpdateCheckStates {
  hasUpdate: boolean;
  text: string;
}

export default class UpdateCheck extends React.Component<
  IUpdateCheckProps,
  IUpdateCheckStates
> {
  private API_URL =
    "https://api.github.com/repos/tbvjaos510/naver-webtoon-history/releases/latest";

  private fetchUpadte() {
    axios.get(this.API_URL).then(result => {
      console.log(result);
      this.setState({ text: result.data.body });
    });
  }

  constructor(props) {
    super(props);

    this.state = {
      hasUpdate: false,
      text: "불러오는 중입니다..."
    };
    whale.sidebarAction.getBadgeText(result => {
      if (result === " ") {
        this.fetchUpadte();
        whale.sidebarAction.setBadgeText({ text: "" });
        this.setState({ hasUpdate: true });
      }
    });
  }
  public render() {
    const { children } = this.props;
    return (
      <React.Fragment>
        {this.state.hasUpdate ? (
          <div
            className="uk-alert-success uk-position-absolute uk-position-z-index"
            uk-alert=""
          >
            <a
              className="uk-alert-close"
              uk-close=""
              onClick={() => this.setState({ hasUpdate: false })}
            />
            <h3>{whale.runtime.getManifest().version} 업데이트 내용</h3>
            <p>{this.state.text}</p>
          </div>
        ) : null}
        {children}
      </React.Fragment>
    );
  }
}
