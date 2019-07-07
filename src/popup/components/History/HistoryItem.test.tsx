import * as React from "react";
import WebtoonStore, { ScrollType } from "../../../store/webtoon";
import HistoryItem, { IHistoryItemProps } from "./HistoryItem";
import { shallow } from "enzyme";

const webtoonStore = {
  scrolls: {
    50: {
      1: 40
    }
  } as ScrollType
} as WebtoonStore;
const props: IHistoryItemProps = {
  item: {
    id: 50,
    no: 1,
    img: "testurl",
    name: "webtoon title",
    noname: "no title",
    type: "webtoon",
    lastVisit: new Date(2018, 3, 3).getTime()
  },
  webtoon: webtoonStore
};
describe("<HistoryItem />", () => {
  it("render if scroll exists", () => {
    const component = shallow(<HistoryItem {...props} />)
      .dive()
      .dive();

    expect(webtoonStore.scrolls[50]).toEqual({ 1: 40 });
    expect(component.find("td.webtoonTitle").text()).toBe(props.item.name);
    expect(component.find("td.webtoonName-td").prop("className")).toContain("view-webtoon");
    expect(component.find("td>a.webtoonName").text()).toBe(`${props.item.noname} (40%)`);

    // button test
    component.find("td.webtoonTime").simulate("click");
    expect(webtoonStore.scrolls[50]).toEqual({});
  });

  it("render if scroll not exists", () => {
    props.item.no = 2;
    const component = shallow(<HistoryItem {...props} />)
      .dive()
      .dive();

    expect(component.find("td.webtoonName-td").prop("className")).not.toContain("view-webtoon");
    expect(component.find("td>a.webtoonName").text()).toBe(props.item.noname + " ");

    // button test
    component.find("td.webtoonTime").simulate("click");
  });
});
