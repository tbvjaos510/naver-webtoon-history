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
  isSearch: boolean;
  keyword: string | null;
}

@inject("option", "webtoon")
@observer
export default class ListDaily extends React.Component<
  ListDailyProps,
  ListDailyStates
> {
  private sortRef: HTMLUListElement = null;
  private searchRef: HTMLInputElement = null;

  constructor(props) {
    super(props);

    this.state = {
      selectDay: weekDay[(new Date().getDay() + 6) % 7],
      isSearch: false,
      keyword: null
    };
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
    this.sortRef.addEventListener("moved", (e: MovedEvent) =>
      this.onItemMoved(e)
    );
  }

  private changeView(index: number) {
    UIkit.tab("#daily-tab").show(
      index + (this.props.option.saveFavorate ? 1 : 0)
    );
  }
  private toggleSearch() {
    this.setState({
      isSearch: !this.state.isSearch,
      keyword: !this.state.isSearch ? "" : null
    });

    if (this.state.isSearch) {
      this.searchRef && this.searchRef.focus();
    } else {
    }
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
      const movedIdx = Array.from(element.parentElement.children).indexOf(
        element
      );
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
        <div
          className="search-box uk-flex uk-flex-1 "
          hidden={!this.state.isSearch}
        >
          <div className="uk-width-expand">
            <form className="uk-search uk-width-1-1">
              <input
                className="uk-search-input"
                type="search"
                value={this.state.keyword || ""}
                placeholder="웹툰 검색..."
                onChange={e => this.setState({ keyword: e.target.value })}
                ref={ref => (this.searchRef = ref)}
              />
            </form>
          </div>

          <a
            className="uk-flex"
            uk-close=""
            onClick={() => this.toggleSearch()}
            href="#"
          />
        </div>

        <DailyList
          selectDay={this.state.selectDay}
          onRef={ref => this.orderChanged(ref)}
          keyword={this.state.keyword}
        />

        <a
          className="uk-icon-button uk-position-medium uk-position-bottom-left"
          onClick={() => this.toggleSearch()}
          href="#"
          uk-icon="search"
        />
      </div>
    );
  }
}
