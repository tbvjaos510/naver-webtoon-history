import * as React from "react";
import { observer, inject } from "mobx-react";
import OptionStore from "../store/option";
import { weekDay, Week } from "../request";
import WebtoonStore from "../store/webtoon";
import DailyList from "../components/Daily/DailyList";

export interface ListDailyProps {
  option?: OptionStore;
}

export interface ListDailyStates {
  selectDay: Week;
}

@inject("option")
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
  private changeDay(day: Week) {
    this.setState({
      selectDay: day
    });

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
    const { option } = this.props;
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
            <li onClick={() => this.changeDay("favo")}>
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
        <DailyList selectDay={this.state.selectDay} />
      </div>
    );
  }
}
