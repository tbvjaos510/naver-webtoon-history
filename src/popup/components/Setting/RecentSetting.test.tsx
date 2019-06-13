import * as React from "react";
import * as sinonChrome from "sinon-chrome";
import OptionStore from "../../../store/option";
import WebtoonStore from "../../../store/webtoon";
import { shallow, ShallowWrapper } from "enzyme";
import RecentSetting, { IRecentSettingProps } from "./RecentSetting";
import SettingButton from "./Inputs/SettingButton";

describe("<RecentSetting />", () => {
  const optionStore = {
    storeLocation: "local",
    historyMax: 100,
    linkTarget: "Tab"
  } as OptionStore;

  const webtoonStore = {
    loadingStatus: "not start",
    setVisitsFromChrome: jest.fn() as Function,
    setRecentWebtoon: jest.fn() as Function,
    visitCount: 20,
    visits: {}
  } as WebtoonStore;

  beforeAll(() => {
    global.chrome = sinonChrome;
  });

  afterAll(() => {
    sinonChrome.flush();
    delete global.chrome;
  });

  describe("render test", () => {
    it("default test", () => {
      global.BROWSER = "chrome";
      const component = shallow(
        <RecentSetting option={optionStore} webtoon={webtoonStore} />
      ).dive();

      expect(
        component
          .find("div.uk-accordion-content>p")
          .at(0)
          .text()
      ).toBe(`현재 ${webtoonStore.visitCount}개의 기록이 있습니다.`);
      expect(component.find("label[htmlFor='historyCount']").prop("uk-tooltip")).toBe(
        `최대 1000개까지 가능합니다`
      );
      component.find(SettingButton).forEach(c => {
        expect(c.prop("disabled")).toBe(true);
      });

      delete global.BROWSER;
    });

    it("storeLocation is sync", () => {
      global.BROWSER = "chrome";
      optionStore.storeLocation = "sync";
      const component = shallow(
        <RecentSetting option={optionStore} webtoon={webtoonStore} />
      ).dive();
      expect(component.find("label[htmlFor='historyCount']").prop("uk-tooltip")).toBe(
        `최대 200개까지 가능합니다`
      );
      delete global.BROWSER;
    });

    it("BROWSER is chrome", () => {
      global.BROWSER = "chrome";
      const component = shallow(
        <RecentSetting option={optionStore} webtoon={webtoonStore} />
      ).dive();
      expect(component.find("ul>li").length).toBe(3);
      delete global.BROWSER;
    });

    it("BROWSER is whale", () => {
      global.BROWSER = "whale";
      const component = shallow(
        <RecentSetting option={optionStore} webtoon={webtoonStore} />
      ).dive();
      expect(component.find("ul>li").length).toBe(4);
      delete global.BROWSER;
    });
  });

  describe("input test", () => {
    let component: ShallowWrapper = null;
    beforeAll(() => {
      global.BROWSER = "chrome";
      webtoonStore.loadingStatus = "end";
      component = shallow(<RecentSetting webtoon={webtoonStore} option={optionStore} />).dive();
      delete global.BROWSER;
    });

    it("get Webtoon History button clicked", () => {
      component.find("SettingButton[tooltip^='방문기록에서']").simulate("click");
      expect(webtoonStore.setVisitsFromChrome).toBeCalled();
    });

    it("remove Webtoon History button clicked", () => {
      component.find("SettingButton[tooltip^='웹툰 기록을 삭제']").simulate("click");
      expect(sinonChrome.storage[optionStore.storeLocation].remove.called).toBe(true);
    });

    it("maintain One button clicked", () => {
      // expect: 높은 수 하나만 남김
      webtoonStore.visits = {
        10: { 1: 30, 2: 15, 3: 50 }
      };
      expect(Object.keys(webtoonStore.visits[10]).length).toBe(3);
      component.find("SettingButton[tooltip^='웹툰의 기록']").simulate("click");
      expect(webtoonStore.setRecentWebtoon).toBeCalled();
      expect(webtoonStore.visits[10]).toEqual({ 3: 50 });
    });

    it("historyCount input changed", () => {
      const changeValue = 35;
      const historyComponent = component.find("input#historyCount");
      expect(historyComponent.prop("value")).toBe(optionStore.historyMax);

      historyComponent.simulate("change", { target: { value: changeValue } });
      expect(optionStore.historyMax).toBe(changeValue);
    });

    it("linkTarget radio changeed", () => {
      expect(
        component.find(`input#link-${optionStore.linkTarget.toLowerCase()}`).prop("checked")
      ).toBe(true);
      component
        .find(`input#link-current`)
        .simulate("change", { target: { checked: true, value: "Current" } });
      expect(optionStore.linkTarget).toBe("Current");
      expect(
        component.find(`input#link-${optionStore.linkTarget.toLowerCase()}`).prop("checked")
      ).not.toBe(true);
    });
  });
});
