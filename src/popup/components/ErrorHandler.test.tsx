import * as React from "react";
import ErrorHandler, { IErrorHandlerStates, IErrorHandlerProps } from "./ErrorHandler";
import { shallow, ShallowWrapper, mount, render } from "enzyme";
import OptionStore from "../../store/option";
import Wlink from "./Wlink";
import * as sinonChrome from "sinon-chrome";
import { mocked } from "ts-jest/utils";

function ProblemChild() {
  throw new Error("test error");
  return <div>Test</div>;
}
const optionStore = new OptionStore();

describe("<ErrorHandler />", () => {
  beforeAll(() => {
    global.chrome = sinonChrome;
  });

  afterAll(() => {
    sinonChrome.flush();
    delete global.chrome;
  });

  it("render test", () => {
    const component = shallow<ErrorHandler>(
      <ErrorHandler option={optionStore}>
        <div id="testChild" />
      </ErrorHandler>
    );

    expect(component.find("div#testChild")).toBeTruthy();
  });

  describe("render when error occured", () => {
    it("from background error", () => {
      const fakeWindow = {
        window: {
          onerror: null as Function
        }
      };
      sinonChrome.extension.getBackgroundPage.returns(fakeWindow);

      expect(fakeWindow.window.onerror).toBeFalsy();
      const component = shallow<ErrorHandler>(
        <ErrorHandler option={new OptionStore()}>
          <div />
        </ErrorHandler>
      ).dive<IErrorHandlerProps, IErrorHandlerStates>();

      expect(fakeWindow.window.onerror).toBeTruthy();
      expect(component.state("hasError")).toBe(false);
      fakeWindow.window.onerror.call(component.instance(), new Event("test"), "testUrl");
      expect(component.state("hasError")).toBe(true);

      sinonChrome.extension.getBackgroundPage.flush();
    });

    it("from window error", () => {
      global.onerror = null;
      expect(global.onerror).toBeFalsy();
      const component = shallow<ErrorHandler>(
        <ErrorHandler option={new OptionStore()}>
          <div />
        </ErrorHandler>
      ).dive<IErrorHandlerProps, IErrorHandlerStates>();
      expect(global.onerror).toBeTruthy();
      expect(component.state("hasError")).toBe(false);
      global.onerror.call(component.instance(), new Event("test"), "testUrl");
      expect(component.state("hasError")).toBe(true);
      delete global.onerror;
      sinonChrome.extension.getBackgroundPage.flush();
    });
  });

  describe("render after error occured", () => {
    let component: ShallowWrapper<IErrorHandlerProps, IErrorHandlerStates> = null;
    beforeAll(() => {
      component = shallow<ErrorHandler>(
        <ErrorHandler option={new OptionStore()}>
          <div />
        </ErrorHandler>
      ).dive<IErrorHandlerProps, IErrorHandlerStates>();
    });

    beforeEach(() => {
      component.setState({ hasError: true });
    });

    it("when close button clicked", () => {
      expect(component.state("hasError")).toBe(true);
      component.find("a.uk-alert-close").simulate("click");
      expect(component.state("hasError")).toBe(false);
    });

    it("when reset button clicked", () => {
      expect(component.state("hasError")).toBe(true);
      component
        .find("a[href]")
        .at(1)
        .simulate("click");
      expect(sinonChrome.storage.local.clear.called).toBe(true);
      expect(sinonChrome.storage.sync.remove.called).toBe(true);
    });
  });
});
