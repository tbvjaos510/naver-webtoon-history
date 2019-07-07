import * as React from "react";
import WebtoonStore from "../../../store/webtoon";
import OptionStore from "../../../store/option";
import { shallow } from "enzyme";
import DailyItem, { IDailyItemProps } from "./DailyItem";

const webtoonStore = {
  recentWebtoon: [
    {
      id: 100,
      no: 5,
      lastVisit: new Date(2018, 6, 6).getTime(),
      name: "testname",
      type: "webtoon",
      img: "imageUrl",
      noname: "noname"
    }
  ],
  starWebtoons: [6]
} as WebtoonStore;

const optionStore = {
  saveFavorate: true,
  saveWebtoonSort: true
} as OptionStore;

const props: IDailyItemProps = {
  item: {
    id: 100,
    img: "testImage",
    isRest: false,
    isUp: false,
    link: "link",
    title: "title"
  },
  webtoon: webtoonStore,
  option: optionStore
};

describe("<DailyItem />", () => {
  describe("render when saveWebtoonSort", () => {
    it("is false", () => {
      optionStore.saveWebtoonSort = false;
      const component = shallow(<DailyItem {...props} />)
        .dive()
        .dive();
      expect(component.find("div.hover-pointer").exists()).toBe(false);
    });
    it("is true", () => {
      optionStore.saveWebtoonSort = true;
      const component = shallow(<DailyItem {...props} />)
        .dive()
        .dive();
      expect(component.find("div.hover-pointer").exists()).toBe(true);
    });
  });

  describe("render when saveFavorate", () => {
    it("is true", () => {
      optionStore.saveFavorate = true;
      const component = shallow(<DailyItem {...props} />)
        .dive()
        .dive();
      expect(component.find("a.favo").exists()).toBe(true);
    });

    it("is false", () => {
      optionStore.saveFavorate = false;
      const component = shallow(<DailyItem {...props} />)
        .dive()
        .dive();
      expect(component.find("a.favo").exists()).toBe(false);
    });

    it("toggled", () => {
      optionStore.saveFavorate = true;
      webtoonStore.starWebtoons = [props.item.id];
      const component = shallow(<DailyItem {...props} />)
        .dive()
        .dive();
      expect(component.find("a.favo").prop("className")).toContain("stared");
      component.find("a.favo").simulate("click");
      component.instance().forceUpdate();
      expect(component.find("a.favo").prop("className")).not.toContain("stared");
      expect(webtoonStore.starWebtoons).not.toContain(props.item.id);
      component.find("a.favo").simulate("click");
      component.instance().forceUpdate();
      expect(component.find("a.favo").prop("className")).toContain("stared");
      expect(webtoonStore.starWebtoons).toContain(props.item.id);
    });
  });

  describe("render when recentWebtoon", () => {
    it("not found", () => {
      props.item.id = 30;
      const component = shallow(<DailyItem {...props} />)
        .dive()
        .dive();
      expect(component.find("a[uk-tooltip*='에 봄']").exists()).toBe(false);
    });

    it("found", () => {
      props.item.id = 100;
      const component = shallow(<DailyItem {...props} />)
        .dive()
        .dive();
      expect(component.find("a[uk-tooltip*='에 봄']").exists()).toBe(true);
    });
  });
  describe("render when isUp and isRest", () => {
    it("is false", () => {
      props.item.isUp = false;
      props.item.isRest = false;
      const component = shallow(<DailyItem {...props} />)
        .dive()
        .dive();
      expect(component.find("em.updt").exists()).toBe(false);
      expect(component.find("em.break").exists()).toBe(false);
    });

    it("is true", () => {
      props.item.isUp = true;
      props.item.isRest = true;
      const component = shallow(<DailyItem {...props} />)
        .dive()
        .dive();
      expect(component.find("em.updt").exists()).toBe(true);
      expect(component.find("em.break").exists()).toBe(true);
    });
  });
});
