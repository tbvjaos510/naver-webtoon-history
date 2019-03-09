import * as React from 'react';

export interface SwitcherProps {
  webtoonComponents: {
    title: string;
    component: typeof React.Component;
  }[];
}

export default class Switcher extends React.Component<SwitcherProps, any> {
  public render() {
    const { webtoonComponents } = this.props;
    return (
      <div>
        <ul className="uk-child-width-expand uk-margin-small" uk-tab="connect: #switcher-tab">
          {webtoonComponents.map(({ title }, i) => (
            <li key={i}>
              <a href="#">{title}</a>
            </li>
          ))}
        </ul>
        <ul className="uk-switcher" id="switcher-tab">
          {webtoonComponents.map(({ component: Component }, i) => (
            <li key={i}>{<Component />}</li>
          ))}
        </ul>
      </div>
    );
  }
}
