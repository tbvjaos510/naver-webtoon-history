import * as React from "react";
import { shallow } from "enzyme";
import DevelopInfo from "./DevelopInfo";
import SettingButton from "./Inputs/SettingButton";

describe("<DevelopInfo />", () => {
  it("render test", () => {
    const component = shallow<DevelopInfo>(<DevelopInfo />);
    expect(component).toBeTruthy();
    expect(component.find("a[href]").text()).toBe("개발 정보");
  });

  it("SettingButton onClick test", () => {
    global.dispatchEvent = jest.fn();
    const component = shallow<DevelopInfo>(<DevelopInfo />);
    component.find(SettingButton).simulate("click");
    expect((global.dispatchEvent.mock.calls[0][0] as Event).type).toBe("extensionUpdate");
    delete global.dispatchEvent;
  });
});
