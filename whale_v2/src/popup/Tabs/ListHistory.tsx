import * as React from "react";
import { inject, observer } from "mobx-react";
import WebtoonStore from "../store/webtoon";
import Wlink from "../components/wlink";
import HistoryItem from "../components/History/HistoryItem";

export interface ListHistoryProps {
  webtoon?: WebtoonStore;
}

@inject("webtoon")
@observer
export default class ListHistory extends React.Component<ListHistoryProps, any> {
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
      <div>
        <table className="viewList uk-table uk-table-small uk-table-divider">
          <caption className="uk-text-center">
            <span>
              최근 웹툰 (
              {webtoon.visitCount > webtoon.MaxView ? webtoon.MaxView + "+" : webtoon.visitCount}
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
              if (value) return <HistoryItem key={idx} item={value} />;
            })}
          </tbody>
        </table>
        <Loading status={webtoon.loadingStatus !== "end"} />
        {webtoon.visitCount > webtoon.MaxView ? (
          <div className="uk-nav-center uk-margin-bottom">
            <button
              className="uk-icon-button"
              uk-icon="icon: chevron-down"
              onClick={() => {
                webtoon.MaxView += 20;
              }}
            />
          </div>
        ) : null}
      </div>
    );
  }
}
