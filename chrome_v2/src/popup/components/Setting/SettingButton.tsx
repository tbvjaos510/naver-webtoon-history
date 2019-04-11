import * as React from "react";

export interface SettingButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: string;
  type?: "primary" | "secondary" | "danger" | "default";
  tooltip?: string;
  disabled?: boolean;
}

export default class SettingButton extends React.Component<SettingButtonProps, any> {
  public render() {
    const { onClick, children, tooltip, type = "default", disabled } = this.props;

    return (
      <button
        className={`uk-button uk-button-small uk-button-${type}`}
        onClick={e => onClick(e)}
        uk-tooltip={tooltip}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }
}
