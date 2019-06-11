import * as React from "react";
import OptionStore from "../../../../store/option";
import { inject, observer } from "mobx-react";

export interface ISettingCheckBoxProps {
  tooltip?: string;
  storeKey: {
    [P in keyof OptionStore]: OptionStore[P] extends boolean ? P : never
  }[keyof OptionStore];
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  text: string;
  option?: OptionStore;
}

@inject("option")
@observer
export default class SettingCheckBox extends React.Component<ISettingCheckBoxProps, null> {
  public render() {
    const { tooltip, storeKey: key, onChange, text, option } = this.props;
    return (
      <p uk-tooltip={tooltip}>
        <input
          id={key}
          className="uk-checkbox"
          type="checkbox"
          checked={option[key]}
          onChange={event => {
            option[key] = event.target.checked;
            onChange && onChange(event);
          }}
        />
        <label htmlFor={key} className="option-title">
          {` ${text}`}
        </label>
      </p>
    );
  }
}
