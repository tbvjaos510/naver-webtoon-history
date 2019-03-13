import * as React from "react";
import { inject, observer } from "mobx-react";
import OptionStore from "../store/option";

export interface wlinkProps {
  /**
   * 링크 주소
   */
  link: string;

  /**
   * [Mobx] Option Store
   */
  option?: OptionStore;
}

export interface wlinkState {
  link: string;
}

@inject("option")
@observer
export default class Wlink extends React.Component<wlinkProps, wlinkState> {
  constructor(props) {
    super(props);
    // Set State
    this.state = {
      link: props.link
    };
  }

  public clickHandler() {
    if (this.props.option) {
      const { link } = this.state;
      switch (this.props.option.linkTarget) {
        case "Current":
          chrome.tabs.update({
            url: link
          });
          break;
        case "Popup":
          chrome.windows.create(
            {
              url: link.replace("https://", "https://m."),
              width: 400,
              height: 800,
              type: "popup"
            },
            window => {
              window.alwaysOnTop = true;
            }
          );
          break;
        case "Tab":
          chrome.tabs.create({
            url: link
          });
          break;
        default:
          console.warn("[Warning] option.linkTarget이 잘못 설정되었습니다.");
          chrome.tabs.create({
            url: link
          });
      }
    }
  }

  public render(): JSX.Element {
    const { children } = this.props;
    const child = React.Children.map(children, child =>
      React.cloneElement(child as React.ReactElement, {
        onClick: this.clickHandler.bind(this)
      })
    );
    return <React.Fragment>{child}</React.Fragment>;
  }
}
