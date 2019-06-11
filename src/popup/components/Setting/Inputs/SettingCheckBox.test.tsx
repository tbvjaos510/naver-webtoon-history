import * as React from "react";
import { shallow } from "enzyme";
import SettingCheckBox, { ISettingCheckBoxProps } from "./SettingCheckBox";
import OptionStore from "../../../../store/option";

describe("<SettingCheckBox />", () => {
  let changed: jest.Mock = null;
  let store: OptionStore = null;
  let props: ISettingCheckBoxProps = null;

  beforeEach(() => {
    changed = jest.fn();
    store = {
      autoNext: true
    } as OptionStore;
    props = {
      onChange: changed,
      option: store,
      storeKey: "autoNext",
      text: "test text",
      tooltip: "test tooltip"
    };
  });

  it("render test", () => {
    const component = shallow<SettingCheckBox>(<SettingCheckBox {...props} />).dive();
    console.log(component.debug());
    expect(component.find("p").prop("uk-tooltip")).toBe(props.tooltip);
    expect(component.find(`input#${props.storeKey}`)).toBeTruthy();
    expect(component.find(`input#${props.storeKey}`).prop("checked")).toBe(store[props.storeKey]);
    expect(component.find(`label.option-title`).prop("htmlFor")).toBe(props.storeKey);
    expect(component.find(`label.option-title`).text()).toBe(` ${props.text}`);
  });

  it("onChange test", () => {
    const component = shallow<SettingCheckBox>(<SettingCheckBox {...props} />).dive();
    expect(store.autoNext).toBe(true);
    component.find(`input#${props.storeKey}`).simulate("change", { target: { checked: false } });
    expect(store.autoNext).toBe(false);
  });
});
