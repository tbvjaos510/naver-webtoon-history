import * as React from "react";
import { observer, inject } from "mobx-react";
import OptionStore from "../store/option";
import { weekDay, Week } from "../request";
import WebtoonStore from "../store/webtoon";
import DailyItem from "../components/DailyItem";
import { observable, action } from "mobx";

export interface ListDailyProps {
  option?: OptionStore;
  webtoon?: WebtoonStore;
}

@inject("option", "webtoon")
@observer
export default class ListDaily extends React.Component<ListDailyProps, any> {
  @observable selectDay: Week = weekDay[(new Date().getDay() + 6) % 7];

  @action
  private changeDay(day: Week) {
    this.selectDay = day;
    console.log("change ", this.selectDay);
  }

  public render() {
    const { option, webtoon } = this.props;
    return (
      <div>
        <ul className="uk-flex-center uk-margin-remove-bottom" uk-tab="true">
          {option.saveFavorate ? (
            <li>
              <a>★</a>
            </li>
          ) : null}
          <li onClick={() => this.changeDay("mon")}>
            <a>월</a>
          </li>
          <li onClick={() => this.changeDay("tue")}>
            <a>화</a>
          </li>
          <li onClick={() => this.changeDay("wed")}>
            <a>수</a>
          </li>
          <li onClick={() => this.changeDay("thu")}>
            <a>목</a>
          </li>
          <li onClick={() => this.changeDay("fri")}>
            <a>금</a>
          </li>
          <li onClick={() => this.changeDay("sat")}>
            <a>토</a>
          </li>
          <li onClick={() => this.changeDay("sun")}>
            <a>일</a>
          </li>
        </ul>
        <div className="uk-padding-small">
          <ul
            className="uk-grid-small  uk-child-width-1-3 uk-child-width-1-3@s uk-text-center daily-webtoon"
            uk-sortable="handle: .uk-card"
            uk-grid="true"
          >
            {webtoon.dailyWebtoons[this.selectDay]
              ? webtoon.dailyWebtoons[this.selectDay].map((value, key) => {
                  return (
                    <li key={key}>
                      <DailyItem item={value} />
                    </li>
                  );
                })
              : null}
          </ul>
        </div>
      </div>
    );
  }
}
