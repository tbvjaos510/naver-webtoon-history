import * as React from "react";
import { observer, inject } from "mobx-react";
import WebtoonStore from "../../store/webtoon";
import { Week } from "../../request";
import DailyItem from "./DailyItem";

export interface MovedEvent extends Event {
  detail: [any, HTMLDataListElement];
}

export interface DailyListProps {
  selectDay: Week | "favo";
  webtoon?: WebtoonStore;
  onRef?: (e: HTMLUListElement) => void;
}

@inject("webtoon")
@observer
export default class DailyList extends React.Component<DailyListProps, any> {
  public render() {
    const { webtoon, selectDay } = this.props;
    return (
      <div className="uk-padding-small scroll-fixed">
        <ul
          className="uk-grid-small uk-child-width-1-3 uk-child-width-1-3@s uk-text-center daily-webtoon"
          uk-sortable={selectDay != "favo" ? "handle: .uk-card" : null}
          uk-grid="true"
          ref={ref => this.props.onRef(ref)}
        >
          {webtoon.dailyWebtoons[selectDay] && selectDay !== "favo"
            ? webtoon.dailyWebtoons[selectDay].map(value => (
                <li key={value.id} data-id={value.id}>
                  <DailyItem item={value} />
                </li>
              ))
            : webtoon.starWebtoonInfo.map((value, key) => (
                <li key={key}>
                  <DailyItem item={value} />
                </li>
              ))}
        </ul>
      </div>
    );
  }
}
