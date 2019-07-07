import * as React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import WebtoonSetting from "./WebtoonSetting";
import WebtoonStore from "../../../store/webtoon";
import OptionStore from "../../../store/option";

const optionStore = {
  orderBy: "StarScore",
  saveWebtoonSort: true
} as OptionStore;

const webtoonStore = {
  starWebtoons: [],
  sortWebtoon: {},
  setDailyWebtoon: jest.fn() as Function
} as WebtoonStore;

describe("<WebtoonSetting />", () => {
  it("render test", () => {
    const component = shallow(<WebtoonSetting option={optionStore} webtoon={webtoonStore} />)
      .dive()
      .dive();
    expect(component.find("a.uk-accordion-title").text()).toBe("웹툰 목록");
  });

  describe("input test", () => {
    let component: ShallowWrapper = null;
    beforeAll(() => {
      component = shallow(<WebtoonSetting option={optionStore} webtoon={webtoonStore} />)
        .dive()
        .dive();
    });

    it("orderBy radio changed", () => {
      expect(optionStore.orderBy).toBe("StarScore");
      component
        .find(`input[value='Update']`)
        .simulate("change", { target: { checked: true, value: "Update" } });
      expect(optionStore.orderBy).toBe("Update");

      component
        .find(`input[value='StarScore']`)
        .simulate("change", { target: { checked: false, value: "StarScore" } });

      expect(optionStore.orderBy).toBe("Update");
    });

    it("delete favorate button clicked ", () => {
      webtoonStore.starWebtoons = [1, 2];
      expect(webtoonStore.starWebtoons.length).toBe(2);

      component.find("SettingButton[tooltip^='즐겨찾기 목록']").simulate("click");
      expect(webtoonStore.starWebtoons.length).toBe(0);
    });

    it("reset order button clicked", () => {
      webtoonStore.sortWebtoon = {
        mon: [1, 2, 3]
      };
      expect(webtoonStore.sortWebtoon.mon.length).toBe(3);

      component.find("SettingButton[tooltip^='웹툰 목록의']").simulate("click");
      expect(webtoonStore.sortWebtoon).toEqual({});
      expect(webtoonStore.setDailyWebtoon).toBeCalled();
    });

    it("saveWebtoonSort is false", () => {
      optionStore.saveWebtoonSort = false;
      component.setProps({ option: optionStore });
      expect(component.find("SettingButton[tooltip^='웹툰 목록의']").exists()).toBe(false);
    });
  });
});
