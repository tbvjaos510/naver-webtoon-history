import * as React from "react";
import { observer, inject } from "mobx-react";
import OptionStore from "../store/option";
import { weekDay, Week } from "../request";
import WebtoonStore from "../store/webtoon";
import DailyList, { MovedEvent } from "../components/Daily/DailyList";
import { toJS } from "mobx";

export interface ListDailyProps {
  option?: OptionStore;
  webtoon?: WebtoonStore;
}

export interface ListDailyStates {
  selectDay: Week | "favo";
}

@inject("option", "webtoon")
@observer
export default class ListDaily extends React.Component<ListDailyProps, ListDailyStates> {
  private sortRef: HTMLUListElement = null;

  constructor(props) {
    super(props);

    this.state = { selectDay: weekDay[(new Date().getDay() + 6) % 7] };
  }

  private changeDay(day: Week | "favo") {
    this.setState({
      selectDay: day
    });
    return true;
  }

  private orderChanged(ref: HTMLUListElement) {
    this.sortRef = ref;
  }

  public componentDidMount() {
    this.changeView((new Date().getDay() + 6) % 7);
    this.sortRef.addEventListener("moved", (e: MovedEvent) => this.onItemMoved(e));
  }

  private changeView(index: number) {
    UIkit.tab("#daily-tab").show(index + (this.props.option.saveFavorate ? 1 : 0));
  }

  private onItemMoved(e: MovedEvent) {
    const { option, webtoon } = this.props;
    if (option.saveWebtoonSort) {
      let wsort;
      if (this.state.selectDay === "favo") {
        wsort = toJS(webtoon.starWebtoons);
      } else {
        wsort = toJS(webtoon.sortWebtoon[this.state.selectDay]);
      }
      const element = e.detail[1];
      const wid = parseInt(element.getAttribute("data-id"));
      const itemIdx = wsort.indexOf(wid);
      const movedIdx = Array.from(element.parentElement.children).indexOf(element);
      wsort.splice(itemIdx, 1);
      wsort.splice(movedIdx, 0, wid);
      if (this.state.selectDay === "favo") {
        webtoon.starWebtoons = wsort;
      } else {
        webtoon.sortWebtoon[this.state.selectDay] = wsort;
        webtoon.sortWebtoon = webtoon.sortWebtoon;
      }
    }
  }

  public render() {
    const { option } = this.props;
    return (
      <div>
        <ul className="uk-flex-center uk-margin-remove-bottom" uk-tab="true" id="daily-tab">
          {option.saveFavorate ? (
            <li>
              <a onClick={() => this.changeDay("favo")}>★</a>
            </li>
          ) : null}
          <li>
            <a onClick={() => this.changeDay("mon")}>월</a>
          </li>
          <li>
            <a onClick={() => this.changeDay("tue")}>화</a>
          </li>
          <li>
            <a onClick={() => this.changeDay("wed")}>수</a>
          </li>
          <li>
            <a onClick={() => this.changeDay("thu")}>목</a>
          </li>
          <li>
            <a onClick={() => this.changeDay("fri")}>금</a>
          </li>
          <li onClick={() => this.changeDay("sat")}>
            <a>토</a>
          </li>
          <li onClick={() => this.changeDay("sun")}>
            <a>일</a>
          </li>
        </ul>
        <DailyList selectDay={this.state.selectDay} onRef={ref => this.orderChanged(ref)} />
      </div>
    );
  }
}
