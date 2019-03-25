import * as React from "react";
import WebtoonStore from "../store/webtoon";
import { Week } from "../request";
import DailyItem from "./DailyItem";
import { observer, inject } from "mobx-react";

export interface DailyListProps {
  selectDay: Week;
  webtoon?: WebtoonStore;
}

@inject("webtoon")
@observer
export default class DailyList extends React.Component<DailyListProps, any> {
  public render() {
    const { webtoon, selectDay } = this.props;
    return (
      <div className="uk-padding-small scroll-fixed">
        <ul
          className="uk-grid-small  uk-child-width-1-3 uk-child-width-1-3@s uk-text-center daily-webtoon"
          uk-sortable="handle: .uk-card"
          uk-grid="true"
        >
          {webtoon.dailyWebtoons[selectDay] && selectDay !== "favo"
            ? webtoon.dailyWebtoons[selectDay].map(value => {
                return (
                  <li key={value.id}>
                    <DailyItem item={value} />
                  </li>
                );
              })
            : webtoon.starWebtoonInfo.map((value, key) => {
                return (
                  <li key={key}>
                    <DailyItem item={value} />
                  </li>
                );
              })}
        </ul>
      </div>
    );
  }
}
