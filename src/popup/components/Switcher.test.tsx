import * as React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import Switcher from "./Switcher";
import { Tabs } from "../Tabs";
const componentInfo = Tabs.webtoonComponents;

describe("<Switcher />", () => {
  let component: ShallowWrapper = null;

  it("render correctly", () => {
    component = shallow(<Switcher {...Tabs} />);
  });

  it("title matches", () => {
    const titles = component.find("ul[uk-tab]>li");

    expect(titles.length).toBe(componentInfo.length);

    for (let i = 0; i < componentInfo.length; i++) {
      expect(
        titles
          .at(i)
          .find("a")
          .text()
      ).toBe(componentInfo[i].title);
    }
  });

  it("component matches", () => {
    const components = component.find("ul#switcher-tab>li");

    expect(components.length).toBe(componentInfo.length);

    for (let i = 0; i < componentInfo.length; i++) {
      const Component = componentInfo[i].component;
      expect(
        components
          .at(i)
          .childAt(0)
          .equals(<Component />)
      ).toBe(true);
    }
  });
});
