import * as React from 'react';

export interface ISwitcherProps {
  webtoonComponents: {
    title: string;
    component: typeof React.Component;
  }[];
}

export default class Switcher extends React.Component<ISwitcherProps, any> {
  private onSwitcherItemClick = (name: string) => {
    return () => {
      ga("send", "event", "popup", "changeSwitch", name);
    };
  };

  public render() {
    const { webtoonComponents } = this.props;
    return (
      <div>
        <ul className="uk-child-width-expand uk-margin-small" uk-tab="connect: #switcher-tab">
          {webtoonComponents.map(({ title }, i) => (
            <li key={i}>
              <a href="#" onClick={this.onSwitcherItemClick(title)}>
                {title}
              </a>
            </li>
          ))}
        </ul>
        <ul className="uk-switcher" id="switcher-tab">
          {webtoonComponents.map(({ component: Component }, i) => (
            <li className="scroll-fixed" key={i}>
              {<Component />}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
