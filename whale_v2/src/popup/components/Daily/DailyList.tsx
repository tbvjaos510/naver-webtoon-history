import * as React from "react";
import { observer, inject } from "mobx-react";
import WebtoonStore from "../../store/webtoon";
import { Week } from "../../request";
import DailyItem from "./DailyItem";
import OptionStore from "../../store/option";
import { toJS } from "mobx";

export interface MovedEvent extends Event {
  detail: [any, HTMLDataListElement];
}

export interface DailyListProps {
  selectDay: Week | "favo";
  webtoon?: WebtoonStore;
  option?: OptionStore;
  onRef?: (e: HTMLUListElement) => void;
  keyword: string | null;
}
export interface DailyListStates {
  viewCount: number;
}

@inject("webtoon", "option")
@observer
export default class DailyList extends React.Component<
  DailyListProps,
  DailyListStates
> {
  constructor(props) {
    super(props);
    this.state = {
      viewCount: 21
    };
  }
  private maxCount: number = 0;

  componentWillUpdate(nextProp: DailyListProps, nextState: DailyListStates) {
    if (
      this.props.selectDay != nextProp.selectDay ||
      this.props.keyword != nextProp.keyword
    ) {
      if (nextProp.selectDay != "favo")
        this.maxCount = this.props.webtoon.dailyWebtoons[
          nextProp.selectDay
        ].length;
      else this.maxCount = this.props.webtoon.starWebtoonInfo.length;

      if (this.maxCount < 21) nextState.viewCount = this.maxCount;
      else nextState.viewCount = 21;
    }
  }
  public render() {
    const { webtoon, selectDay, option, keyword } = this.props;

    return (
      <div
        className="uk-padding-small scroll-fixed webtoon-list"
        onScroll={({ currentTarget: target }) => {
          if (target.offsetHeight + target.scrollTop >= target.scrollHeight) {
            this.setState({
              viewCount: this.state.viewCount + 9
            });
          }
        }}
      >
        <ul
          className="uk-grid-small uk-child-width-1-3 uk-child-width-1-3@s uk-text-center daily-webtoon"
          uk-sortable={
            option.saveWebtoonSort && keyword == null
              ? "handle: .uk-card"
              : null
          }
          uk-grid="true"
          ref={ref => this.props.onRef(ref)}
        >
          {keyword === null
            ? webtoon.dailyWebtoons[selectDay] && selectDay !== "favo"
              ? webtoon.dailyWebtoons[selectDay].map((value, index) => {
                  if (index < this.state.viewCount)
                    return (
                      <li key={value.id} data-id={value.id}>
                        <DailyItem item={value} />
                      </li>
                    );
                })
              : webtoon.starWebtoonInfo.map((value, index) => {
                  if (index < this.state.viewCount)
                    return (
                      <li key={value.id} data-id={value.id}>
                        <DailyItem item={value} />
                      </li>
                    );
                })
            : webtoon.allWebtoon
                .sort((a, b) => (a.title > b.title ? 1 : -1))
                .filter(value => {
                  // 검색
                  if (
                    value.title
                      .replace(" ", "")
                      .indexOf(keyword.replace(" ", "")) > -1
                  ) {
                    return true;
                  }
                })
                .map((value, idx) => {
                  if (idx < this.state.viewCount)
                    return (
                      <li key={value.id} data-id={value.id}>
                        <DailyItem item={value} keyword={keyword} />
                      </li>
                    );
                })}
        </ul>
      </div>
    );
  }
}
