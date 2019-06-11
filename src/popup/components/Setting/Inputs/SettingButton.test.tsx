import * as React from "react";
import { shallow } from "enzyme";
import SettingButton, { ISettingButtonProps } from "./SettingButton";

describe("<SettingButton />", () => {
  let clicked: jest.Mock = null;
  let props: ISettingButtonProps = null;
  beforeEach(() => {
    clicked = jest.fn();
    props = {
      children: "text",
      onClick: clicked,
      disabled: true,
      tooltip: "TestTooltip",
      type: "primary"
    };
  });

  it("render test", () => {
    const button = shallow(<SettingButton {...props} />).find("button");

    expect(button.text()).toBe(props.children);
    expect(button.prop("uk-tooltip")).toBe(props.tooltip);
    expect(button.prop("disabled")).toBe(props.disabled);
    expect(button.prop("className")).toContain(`uk-button-${props.type}`);
  });

  it("button click test", () => {
    const button = shallow(<SettingButton {...props} />).find("button");
    expect(clicked).not.toBeCalled();
    button.simulate("click");
    expect(clicked).toBeCalled();
  });

  it("type default test", () => {
    delete props.type;
    const button = shallow(<SettingButton {...props} />).find("button");

    expect(button.prop("className")).toContain(`uk-button-default`);
  });
});
