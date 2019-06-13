import * as React from "react";
import WebtoonStore from "../../../store/webtoon";
import request, { WebtoonInfo } from "../../../tools/request";
import axios from "axios";
import { mocked } from "ts-jest/utils";
import allWebtoonHtml from "../../../tools/request/allWebtoon.html";
import completeWebtoonHtml from "../../../tools/request/completeWebtoon.html";
import OptionStore from "../../../store/option";
import { shallow } from "enzyme";
import DailyItemList from "./DailyItemList";

jest.mock("axios");
let webtoonStore: WebtoonStore = null;
let optionStore = {
  saveWebtoonSort: true
} as OptionStore;
async function initWebtoonStore() {
  mocked(axios.get).mockResolvedValueOnce({ data: allWebtoonHtml } as any);
  mocked(axios.get).mockResolvedValueOnce({ data: completeWebtoonHtml } as any);

  webtoonStore = {
    dailyWebtoons: await request.getAllWebtoon("StarScore"),
    allWebtoon: await request.getCompleteWebtoon()
  } as WebtoonStore;
}

describe("<DailyList />", () => {
  beforeAll(async done => {
    await initWebtoonStore();
    done();
  });
  it("render test", () => {
    const onRef = jest.fn();
    const component = shallow(
      <DailyItemList
        selectDay="mon"
        onRef={onRef}
        option={optionStore}
        webtoon={webtoonStore}
        keyword={null}
      />
    ).dive();

    // limit test
    // expect(component.find("ul.daily_webtoon>li").length).toBe(21);
  });
});
