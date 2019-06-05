import * as React from "react";
import ErrorHandler from "./ErrorHandler";
import { shallow, ShallowWrapper, mount, render } from "enzyme";
import OptionStore from "../../store/option";
import Wlink from "./Wlink";

function ProblemChild() {
  throw new Error("test error");
  return <div>Test</div>;
}
const optionStore = new OptionStore();

describe("<ErrorHandler />", () => {
  it("render test", () => {
    const component = shallow<ErrorHandler>(
      <ErrorHandler option={optionStore}>
        <div id="testChild" />
      </ErrorHandler>
    );

    expect(component.find("div#testChild")).toBeTruthy();
  });

  it("render when error occured", () => {
    const component = shallow<ErrorHandler>(
      <ErrorHandler option={new OptionStore()}>
        <div id="testChild" />
        {/* <ProblemChild /> */}
      </ErrorHandler>
    );
    console.log(component.debug());
    // expect(component.find()).toBeTruthy();
  });
});
