import * as React from "react";
import { observer, inject } from "mobx-react";
import OptionStore from "../../store/option";
import { weekDay, Week } from "../../tools/request";
import WebtoonStore from "../../store/webtoon";
import DailyList, { MovedEvent } from "../components/Daily/DailyList";
import { toJS } from "mobx";
import SearchWebtoon from "../components/Daily/SearchWebtoon";

export interface IListDailyProps {
  option?: OptionStore;
  webtoon?: WebtoonStore;
}

export interface IListDailyStates {
  selectDay: Week | "favo";
  isSearch: boolean;
  keyword: string | null;
}

@inject("option", "webtoon")
@observer
export default class ListDaily extends React.Component<IListDailyProps, IListDailyStates> {
  private sortRef: HTMLUListElement = null;

  constructor(props) {
    super(props);

    this.state = {
      selectDay: weekDay[(new Date().getDay() + 6) % 7],
      isSearch: false,
      keyword: null
    };

    // 자식 클래스에서 메소드 사용
    this.toggleSearch = this.toggleSearch.bind(this);
    this.changeKeyword = this.changeKeyword.bind(this);
  }
  private readonly day = ["월", "화", "수", "목", "금", "토", "일"];

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
  private toggleSearch() {
    this.setState({
      isSearch: !this.state.isSearch,
      keyword: !this.state.isSearch ? "" : null
    });
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

  private changeKeyword(keyword: string) {
    this.setState({
      keyword
    });
  }

  public render() {
    const { option } = this.props;
    return (
      <div>
        <ul
          className="uk-flex-center uk-margin-remove-bottom"
          uk-tab="true"
          id="daily-tab"
          hidden={this.state.isSearch}
        >
          {option.saveFavorate ? (
            <li>
              <a onClick={() => this.changeDay("favo")}>★</a>
            </li>
          ) : null}

          {weekDay.map((week, index) => {
            return (
              <li key={week}>
                <a onClick={() => this.changeDay(week)}>{this.day[index]}</a>
              </li>
            );
          })}
        </ul>

        <SearchWebtoon
          changeKeyword={this.changeKeyword}
          hidden={!this.state.isSearch}
          toggleSearch={this.toggleSearch}
          keyword={this.state.keyword}
        />

        <DailyList
          selectDay={this.state.selectDay}
          onRef={ref => this.orderChanged(ref)}
          keyword={this.state.keyword}
        />
        <a
          className="uk-icon-button uk-position-medium uk-position-bottom-right"
          onClick={() => this.toggleSearch()}
          href="#"
          uk-icon="search"
        />
      </div>
    );
  }
}
