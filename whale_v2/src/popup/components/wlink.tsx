import * as React from "react";
import { inject, observer } from "mobx-react";
import OptionStore from "../store/option";

export interface wlinkProps {
  /**
   * 링크 주소
   */
  link: string;

  /**
   * 강제로 새탭으로 여는 여부
   */
  forceTab?: boolean;

  /**
   * [Mobx] Option Store
   */
  option?: OptionStore;
}

@inject("option")
@observer
export default class Wlink extends React.Component<wlinkProps, null> {
  public clickHandler() {
    const { link, option, forceTab } = this.props;
    if (forceTab) {
      return chrome.tabs.create({
        url: link
      });
    }
    switch (option.linkTarget) {
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
      case "Sidebar":
        location.href = link.replace("https://", "https://m.");
        break;
      default:
        console.warn("[Warning] option.linkTarget이 잘못 설정되었습니다.");
        chrome.tabs.create({
          url: link
        });
    }
  }

  public render() {
    const { children, link } = this.props;
    const child = React.Children.map(children, child =>
      React.cloneElement(child as React.ReactElement, {
        onClick: this.clickHandler.bind(this),
        href: link
      })
    );
    return <React.Fragment>{child}</React.Fragment>;
  }
}