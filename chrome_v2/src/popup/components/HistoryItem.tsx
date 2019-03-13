import * as React from "react";
import Wlink from "./wlink";
import { RecentWebtoon } from "../store/webtoon";

export interface HistoryItemProps {
  item: RecentWebtoon;
}

export default class HistoryItem extends React.Component<
  HistoryItemProps,
  any
> {
  public render() {
    const { item } = this.props;
    return (
      <tr>
        <Wlink
          link={`https://comic.naver.com${item.type}/list.nhn?titleId=${
            item.id
          }`}
        >
          <td className="webtoonTitle">{item.name}</td>
        </Wlink>
        <Wlink
          link={`https://comic.naver.com${item.type}/detail.nhn?titleId=${
            item.id
          }&no=${item.no}`}
        >
          <td>
            <img src={item.img} />
            <a className="webtoonName">{item.noname}</a>
          </td>
        </Wlink>
        <td>
          <span>
            {new Date(item.lastVisit)
              .toLocaleString()
              .split(" 오")
              .map((line, idx) => {
                return (
                  <React.Fragment key={idx}>
                    {idx == 1 ? "오" + line : line} <br />
                  </React.Fragment>
                );
              })}
          </span>
        </td>
      </tr>
    );
  }
}
