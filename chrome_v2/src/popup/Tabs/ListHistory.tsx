import * as React from 'react';

export interface ListHistoryProps {}

export default class ListHistory extends React.Component<ListHistoryProps, any> {
  public render() {
    return (
      <div>
        <table className="viewList uk-table uk-table-small uk-table-divider">
          <caption className="uk-text-center">
            <span>최근 웹툰 (30개)</span>
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
          <tbody />
        </table>
        <span
          style={{
            display: 'table',
            margin: 'auto',
          }}
          uk-spinner="ratio: 4.5"
        />
        <div className="uk-nav-center uk-margin-bottom">
          <button className="uk-icon-button" uk-icon="icon: chevron-down" />
        </div>
      </div>
    );
  }
}
