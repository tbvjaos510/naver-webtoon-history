import * as React from "react";
import WebtoonStore from "../store/webtoon";
import { Week } from "../request";
import DailyItem from "./DailyItem";
import { observer } from "mobx-react";

export interface HistoryListProps {
  selectDay: Week;
  webtoon?: WebtoonStore;
}

@observer
export default class HistoryList extends React.Component<
  HistoryListProps,
  any
> {
  public render() {
    const { webtoon, selectDay } = this.props;
    return (
      <div className="uk-padding-small">
        <ul
          className="uk-grid-small  uk-child-width-1-3 uk-child-width-1-3@s uk-text-center daily-webtoon"
          uk-sortable="handle: .uk-card"
          uk-grid="true"
        >
          {webtoon.dailyWebtoons[selectDay]
            ? webtoon.dailyWebtoons[selectDay].map((value, key) => {
                return (
                  <li key={key}>
                    <DailyItem item={value} />
                  </li>
                );
              })
            : null}
        </ul>
      </div>
    );
  }
}
