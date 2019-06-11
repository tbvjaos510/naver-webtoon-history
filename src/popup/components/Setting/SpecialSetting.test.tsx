import * as React from "react";
import { shallow } from "enzyme";
import SpecialSetting from "./SpecialSetting";

describe("<SpecialSetting />", () => {
  it("render test", () => {
    const component = shallow(<SpecialSetting />);
    expect(component.find("a.uk-accordion-title").text()).toBe("특수 기능");
  });
});
