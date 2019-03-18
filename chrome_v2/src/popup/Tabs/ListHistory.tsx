import * as React from "react";
import { inject, observer } from "mobx-react";
import WebtoonStore from "../store/webtoon";
import Wlink from "../components/wlink";
import HistoryItem from "../components/HistoryItem";

export interface ListHistoryProps {
  webtoon?: WebtoonStore;
}

@inject("webtoon")
@observer
export default class ListHistory extends React.Component<
  ListHistoryProps,
  any
> {
  public MaxView: number = 30;
  public render() {
    const { webtoon } = this.props;
    // this.props.webtoon.getRecentWebtoon();
    function Loading(props: { status: boolean }): JSX.Element {
      if (props.status) {
        return (
          <span
            style={{
              display: "table",
              margin: "auto"
            }}
            uk-spinner="ratio: 4.5"
          />
        );
      }
      return null;
    }
    return (
      <div className="scroll-fixed">
        <table className="viewList uk-table uk-table-small uk-table-divider">
          <caption className="uk-text-center">
            <span>
              최근 웹툰 (
              {webtoon.visitCount > this.MaxView
                ? this.MaxView
                : webtoon.visitCount}
              개)
            </span>
          </caption>
          <colgroup>
            <col width="100" />
            <col width="*" />
            <col width="95" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">웹툰 이름</th>
              <th scope="col">회차</th>
              <th scope="col">시간</th>
            </tr>
          </thead>
          <tbody className="recent">
            {webtoon.recentWebtoon.map((value, idx) => {
              return <HistoryItem key={idx} item={value} />;
            })}
          </tbody>
        </table>
        <Loading status={webtoon.loadingStatus !== "end"} />
        <div className="uk-nav-center uk-margin-bottom">
          <button className="uk-icon-button" uk-icon="icon: chevron-down" />
        </div>
      </div>
    );
  }
}
