import * as React from "react";
import { mount, ReactWrapper } from "enzyme";
import Wlink, { IWlinkProps } from "./Wlink";
import OptionStore from "../../store/option";
import Link from "../../tools/link";
import { mocked } from "ts-jest/utils";

jest.mock("../../tools/link");

const defaultProps: IWlinkProps = {
  forceTab: false,
  link: "http://test.com",
  option: new OptionStore()
};

describe("<Wlink />", () => {
  let component: ReactWrapper = null;
  it("render check", () => {
    component = mount(
      <Wlink {...defaultProps}>
        <a />
      </Wlink>
    );
    expect(component.find("a").prop("href")).toBe(defaultProps.link);
  });

  describe("clickHandler() call when", () => {
    it("forceTab is true", () => {
      component.setProps({ ...defaultProps, forceTab: true } as IWlinkProps);
      component.find("a").simulate("click");
      expect(Link.openNewTab).toBeCalled();
    });

    it("forceTab is false", () => {
      const option = { linkTarget: "Popup" };
      component.setProps({ ...defaultProps, forceTab: false, option } as IWlinkProps);
      component.find("a").simulate("click");
      expect(Link.openUrl).toBeCalledWith("Popup", defaultProps.link);
    });
  });
});
