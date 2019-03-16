import * as React from "react";
import { observer, inject } from "mobx-react";
import OptionStore from "../store/option";
import { weekDay, Week } from "../request";
import WebtoonStore from "../store/webtoon";
import DailyItem from "../components/DailyItem";
import { observable, action } from "mobx";
import HistoryList from "../components/HistoryList";

export interface ListDailyProps {
  option?: OptionStore;
  webtoon?: WebtoonStore;
}

export interface ListDailyStates {
  selectDay: Week;
}

@inject("option", "webtoon")
@observer
export default class ListDaily extends React.Component<
  ListDailyProps,
  ListDailyStates
> {
  private tabRef: HTMLUListElement = null;

  constructor(props) {
    super(props);

    this.state = { selectDay: weekDay[(new Date().getDay() + 6) % 7] };
  }
  @action
  private changeDay(day: Week) {
    this.setState({
      selectDay: day
    });

    // this.changeView(weekDay.indexOf(day));
    console.log("change ", this.state.selectDay, weekDay.indexOf(day));
    return true;
  }

  public componentDidMount() {
    this.changeView((new Date().getDay() + 6) % 7);
  }

  private changeView(index: number) {
    if (this.tabRef)
      UIkit.tab(this.tabRef).show(
        index + (this.props.option.saveFavorate ? 1 : 0)
      );
  }
  public render() {
    const { option, webtoon } = this.props;
    return (
      <div>
        <ul
          className="uk-flex-center uk-margin-remove-bottom"
          uk-tab="true"
          ref={ref => {
            this.tabRef = ref;
          }}
        >
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
        <HistoryList selectDay={this.state.selectDay} webtoon={webtoon} />
      </div>
    );
  }
}
