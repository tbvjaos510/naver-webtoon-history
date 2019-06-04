import * as React from "react";
import mockWhale from "../../__mocks__/whale";
import * as sinonChrome from "sinon-chrome";
import axios from "axios";
import { ReactWrapper, mount, shallow } from "enzyme";
import UpdateCheck, { IUpdateCheckStates } from "./UpdateCheck";
import { mocked } from "ts-jest/utils";
import { Provider } from "mobx-react";

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
const testVerion = "1.0.0";

describe("<UpdateCheck />", () => {
  let component: ReactWrapper = null;

  beforeAll(() => {
    global.chrome = sinonChrome;
    global.whale = mockWhale;
    global.BROWSER = "chrome";

    sinonChrome.runtime.getManifest.returns({ version: testVerion });
    component = mount(
      <UpdateCheck>
        <div />
      </UpdateCheck>
    );

    sinonChrome.runtime.getManifest.flush();
  });

  afterAll(() => {
    sinonChrome.flush();
    delete global.chrome;
    delete global.whale;
  });

  describe("fetchUpdate() called", () => {
    beforeAll(() => {
      sinonChrome.runtime.getManifest.returns({ version: testVerion });
    });

    afterAll(() => {
      sinonChrome.runtime.getManifest.flush();
    });
    describe("browser is chrome and ", () => {
      let instance = null;
      beforeAll(() => {
        global.BROWSER = "chrome";
      });
      beforeEach(() => {
        sinonChrome.browserAction.getBadgeText.flush();
        sinonChrome.browserAction.setBadgeText.flush();
      });

      afterAll(() => {
        delete global.BROWSER;
      });

      it("badge is exists", () => {
        const c = mount(
          <UpdateCheck>
            <div />
          </UpdateCheck>
        );
        const instance = c.instance() as UpdateCheck;
        instance.fetchUpdate = jest.fn();

        sinonChrome.browserAction.getBadgeText.yield(" ");

        expect(instance.fetchUpdate).toBeCalled();
        expect(sinonChrome.browserAction.setBadgeText.called).toBe(true);
      });

      it("badge not exists", () => {
        const c = mount(
          <UpdateCheck>
            <div />
          </UpdateCheck>
        );
        const instance = c.instance() as UpdateCheck;
        instance.fetchUpdate = jest.fn();

        sinonChrome.browserAction.getBadgeText.yield("");

        expect(instance.fetchUpdate).not.toBeCalled();
        expect(sinonChrome.browserAction.setBadgeText.called).toBe(false);
      });
    });

    describe("browser is whale and", () => {
      beforeAll(() => {
        global.BROWSER = "whale";
      });

      beforeEach(() => {
        mockWhale.sidebarAction.getBadgeText.mockClear();
        mockWhale.sidebarAction.setBadgeText.mockClear();
      });

      afterAll(() => {
        delete global.BROWSER;
      });

      it("badge is exists", () => {
        const c = mount(
          <UpdateCheck>
            <div />
          </UpdateCheck>
        );
        const instance = c.instance() as UpdateCheck;
        instance.fetchUpdate = jest.fn();

        mockWhale.sidebarAction.getBadgeText.mock.calls[0][0](" ");

        expect(instance.fetchUpdate).toBeCalled();
        expect(mockWhale.sidebarAction.setBadgeText).toBeCalled();
      });

      it("badge not exists", () => {
        const c = mount(
          <UpdateCheck>
            <div />
          </UpdateCheck>
        );
        const instance = c.instance() as UpdateCheck;
        instance.fetchUpdate = jest.fn();

        mockWhale.sidebarAction.getBadgeText.mock.calls[0][0]("");

        expect(instance.fetchUpdate).not.toBeCalled();
        expect(mockWhale.sidebarAction.setBadgeText).not.toBeCalled();
      });
    });

    it("extensionUpdate fired", () => {
      global.BROWSER = "chrome";

      const c = mount(
        <UpdateCheck>
          <div />
        </UpdateCheck>
      );
      (c.instance() as UpdateCheck).fetchUpdate = jest.fn();
      window.dispatchEvent(new Event("extensionUpdate"));

      expect((c.instance() as UpdateCheck).fetchUpdate).toBeCalled();

      delete global.BROWSER;
    });
  });

  describe("render currently", () => {
    beforeAll(() => {
      global.BROWSER = "chrome";
      sinonChrome.runtime.getManifest.returns({ version: testVerion });
    });

    afterAll(() => {
      sinonChrome.runtime.getManifest.flush();
      mocked(axios.get).mockClear();
      delete global.BROWSER;
    });
    it("close buton", () => {
      component.setState({ hasUpdate: true } as IUpdateCheckStates);
      expect(component.state("hasUpdate")).toBe(true);
      component.find("a.uk-alert-close").simulate("click");
      expect(component.state("hasUpdate")).toBe(false);
    });

    it("ReactMarkdown work", async () => {
      const info = JSON.parse(JSON.stringify(releaseInfo));
      info[1].body = "[link test](http://www.naver.com)";
      mocked(axios.get).mockResolvedValue({ data: info } as any);

      // mount with Provider
      const c = mount(
        <Provider option={{}}>
          <UpdateCheck>
            <div />
          </UpdateCheck>
        </Provider>
      );

      // call fetchUpdate
      await (c.childAt(0).instance() as UpdateCheck).fetchUpdate();
      c.childAt(0).setState({ hasUpdate: true } as IUpdateCheckStates);
      expect(
        c
          .childAt(0)
          .find("a[href]")
          .prop("href")
      ).toBe("http://www.naver.com");
    });
  });

  describe("set text when", () => {
    beforeAll(() => {
      global.BROWSER = "chrome";
    });

    afterAll(() => {
      delete global.BROWSER;
    });

    afterEach(() => {
      mocked(axios.get).mockClear();
    });

    it("version is incurrect", async () => {
      sinonChrome.runtime.getManifest.returns({ version: "2.0.0" });
      mocked(axios.get).mockResolvedValue({ data: releaseInfo } as any);
      component.update();
      const instance = component.instance() as UpdateCheck;

      await instance.fetchUpdate();

      expect(instance.state.text).toBe("업데이트 정보를 찾지 못했습니다.");
    });

    it("version is currect", async () => {
      sinonChrome.runtime.getManifest.returns({ version: "1.0.0" });
      mocked(axios.get).mockResolvedValue({ data: releaseInfo } as any);
      const instance = component.instance() as UpdateCheck;
      component.update();

      await instance.fetchUpdate();

      expect(instance.state.text).toBe(releaseInfo[1].body);
    });

    it("axios error", async () => {
      sinonChrome.runtime.getManifest.returns({ version: "1.0.0" });
      mocked(axios.get).mockReset();
      mocked(axios.get).mockRejectedValue(new Error("test error"));
      const instance = component.instance() as UpdateCheck;

      await instance.fetchUpdate();
      expect(instance.state.text).toBe("목록을 불러오는 중 오류가 발생했습니다.");
    });
  });
});
