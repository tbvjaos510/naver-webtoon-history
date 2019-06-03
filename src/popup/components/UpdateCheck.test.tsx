import * as React from "react";
import mockWhale from "../../__mocks__/whale";
import * as sinonChrome from "sinon-chrome";
import UpdateCheck from "./UpdateCheck";
import { ShallowWrapper, shallow, render, mount } from "enzyme";
import axios from "axios";
import { mocked } from "ts-jest/utils";

jest.mock("axios");

const releaseInfo = [
  {
    tag_name: "whale-1.0.0",
    body: "whale-release"
  },
  {
    tag_name: "chrome-1.0.0",
    body: "chrome-release"
  }
];

describe("<UpdateCheck />", () => {
  beforeAll(() => {
    global.chrome = sinonChrome;
    global.whale = mockWhale;
  });

  afterAll(() => {
    sinonChrome.flush();
    delete global.chrome;
    delete global.whale;
  });

  describe("render currently when", () => {
    const testVerion = "1.0.0";
    beforeAll(() => {
      sinonChrome.runtime.getManifest.returns({ version: testVerion });
      mocked(axios.get).mockResolvedValue({ data: releaseInfo } as any);
    });
    it("browser is chrome", () => {
      global.BROWSER = "chrome";
      const component = mount(
        <UpdateCheck>
          <div />
        </UpdateCheck>
      );

      expect(component.state("hasUpdate")).toBe(false);
      sinonChrome.browserAction.getBadgeText.yield(" ");

      expect(component.state("hasUpdate")).toBe(true);
      // wait axios.get()
      setTimeout(() => {
        expect(component.state("text")).toBe(releaseInfo[1].body);
        expect(component.find("div[uk-alert]>h3").text()).toBe(testVerion + " 업데이트 내용");
        delete global.BROWSER;
      }, 100);

      sinonChrome.browserAction.getBadgeText.flush();
    });

    it("browser is whale", () => {
      global.BROWSER = "whale";

      const component = mount(
        <UpdateCheck>
          <div />
        </UpdateCheck>
      );
      expect(component.state("hasUpdate")).toBe(false);
      mockWhale.sidebarAction.getBadgeText.mock.calls[0][0](" ");
      expect(component.state("hasUpdate")).toBe(true);

      setTimeout(() => {
        expect(component.state("text")).toBe(releaseInfo[0].body);
        expect(component.find("div[uk-alert]>h3").text()).toBe(testVerion + " 업데이트 내용");
        delete global.BROWSER;
      }, 100);
    });

    it("extensionUpdate event fire", () => {
      global.BROWSER = "chrome";
      const component = mount(
        <UpdateCheck>
          <div />
        </UpdateCheck>
      );

      expect(component.state("hasUpdate")).toBe(false);
      window.dispatchEvent(new Event("extentionUpdate"));

      expect(component.state("hasUpdate")).toBe(true);
      // wait axios.get()
      setTimeout(() => {
        expect(component.state("text")).toBe(releaseInfo[1].body);
        expect(component.find("div[uk-alert]>h3").text()).toBe(testVerion + " 업데이트 내용");
        delete global.BROWSER;
      }, 100);

      sinonChrome.browserAction.getBadgeText.flush();
    });
  });

  describe("set text when", () => {
    it("version is incurrect", () => {
      global.BROWSER = "chrome";
      sinonChrome.runtime.getManifest.returns({ version: "2.0.0" });
      mocked(axios.get).mockResolvedValue({ data: releaseInfo } as any);

      const component = mount(
        <UpdateCheck>
          <div />
        </UpdateCheck>
      );

      sinonChrome.browserAction.getBadgeText.yield(" ");

      setTimeout(() => {
        expect(component.state("text")).toBe("업데이트 정보를 찾지 못했습니다.");
      }, 100);

      sinonChrome.browserAction.getBadgeText.flush();
    });

    it("axios error", () => {
      global.BROWSER = "chrome";
      sinonChrome.runtime.getManifest.returns({ version: "1.0.0" });
      mocked(axios.get).mockRejectedValue(new Error("test error"));

      const component = mount(
        <UpdateCheck>
          <div />
        </UpdateCheck>
      );

      sinonChrome.browserAction.getBadgeText.yield(" ");

      setTimeout(() => {
        expect(component.state("text")).toBe("목록을 불러오는 중 오류가 발생했습니다.");
      }, 100);

      sinonChrome.browserAction.getBadgeText.flush();
    });
  });
});
