import * as React from "react";
import Wlink from "../wlink";
import WebtoonStore, { RecentWebtoon } from "../../store/webtoon";
import { observer, inject } from "mobx-react";

import { format, distanceInWordsToNow } from "date-fns";
import * as ko from "date-fns/locale/ko";

export interface HistoryItemProps {
  webtoon?: WebtoonStore;
  item: RecentWebtoon;
}

@inject("webtoon")
@observer
export default class HistoryItem extends React.Component<HistoryItemProps, any> {
  private deleteScroll() {
    const { item, webtoon } = this.props;
    const { scrolls } = webtoon;
    if (scrolls[item.id] && scrolls[item.id][item.no]) {
      delete scrolls[item.id][item.no];
      webtoon.scrolls = scrolls;
    }
  }
  public render() {
    const { item, webtoon } = this.props;
    const { scrolls } = webtoon;
    const moment = distanceInWordsToNow(item.lastVisit, {
      locale: ko,
      addSuffix: true
    });
    const time = format(item.lastVisit, "YYYY년 MM월 DD일<br>A hh시 mm분에 봄", {
      locale: ko
    });

    return (
      <tr>
        <Wlink link={`https://comic.naver.com${item.type}/list.nhn?titleId=${item.id}`}>
          <td className="webtoonTitle">{item.name}</td>
        </Wlink>
        <Wlink
          link={`https://comic.naver.com${item.type}/detail.nhn?titleId=${item.id}&no=${item.no}`}
        >
          <td className={scrolls[item.id] && scrolls[item.id][item.no] ? "view-webtoon" : ""}>
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
        <td
          uk-tooltip={
            scrolls[item.id] && scrolls[item.id][item.no]
              ? time + "<br>클릭시 스크롤 기록이 삭제됩니다."
              : time
          }
          className="webtoonTime"
          onClick={() => this.deleteScroll()}
        >
          {moment}
        </td>
      </tr>
    );
  }
}
