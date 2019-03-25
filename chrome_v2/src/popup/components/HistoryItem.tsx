import * as React from "react";
import Wlink from "./wlink";
import WebtoonStore, { RecentWebtoon } from "../store/webtoon";
import { observer, inject } from "mobx-react";

export interface HistoryItemProps {
  webtoon?: WebtoonStore;
  item: RecentWebtoon;
}

@inject("webtoon")
@observer
export default class HistoryItem extends React.Component<
  HistoryItemProps,
  any
> {
  public render() {
    const { item, webtoon } = this.props;
    const { scrolls } = webtoon;
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
          <td
            className={
              scrolls[item.id] && scrolls[item.id][item.no]
                ? "view-webtoon"
                : ""
            }
          >
            <img src={item.img} />
            <a className="webtoonName">
              {item.noname}{" "}
              {scrolls[item.id] && scrolls[item.id][item.no] ? (
                <span>({scrolls[item.id][item.no]}%)</span>
              ) : (
                ""
              )}
            </a>
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
