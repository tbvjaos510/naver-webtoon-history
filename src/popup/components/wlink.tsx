import * as React from "react";
import { inject, observer } from "mobx-react";
import OptionStore from "../../store/option";
import Link from "../../tools/link";

export interface IWlinkProps {
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
export default class Wlink extends React.Component<IWlinkProps, null> {
  public clickHandler(event: React.MouseEvent) {
    event.preventDefault();
    const { link, option, forceTab } = this.props;
    if (forceTab) {
      return Link.openNewTab(link);
    }
    Link.openUrl(option.linkTarget, link);
    return false;
  }

  public render() {
    const { children, link } = this.props;
    const child = React.Children.map(children, child =>
      React.cloneElement(child as React.ReactElement, {
        onClick: this.clickHandler.bind(this),
        href: link
      })
    );
    return child;
  }
}
