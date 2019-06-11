import * as React from "react";
import { shallow } from "enzyme";
import WebtoonSetting from "./WebtoonSetting";
import WebtoonStore from "../../../store/webtoon";
import OptionStore from "../../../store/option";

const optionStore = {
  orderBy: "StarScore",
  saveWebtoonSort: true
} as OptionStore;

const webtoonStore = {
  starWebtoons: [],
  sortWebtoon: {}
} as WebtoonStore;

describe("<WebtoonSetting />", () => {
  it("render test", () => {
    const component = shallow(
      <WebtoonSetting option={optionStore} webtoon={webtoonStore} />
    ).dive();
    expect(component.find("a.uk-accordion-title").text()).toBe("웹툰 목록");
  });
});
