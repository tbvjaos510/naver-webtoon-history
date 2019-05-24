import * as React from "react";
import Wlink from "../wlink";
import WebtoonStore, { RecentWebtoon } from "../../../store/webtoon";
import { observer, inject } from "mobx-react";
import * as format from "date-fns/format";
import * as distanceInWordsToNow from "date-fns/distance_in_words_to_now";
import * as ko from "date-fns/locale/ko";
import { contextMenu } from "react-contexify";
import HistoryItemContext from "./HistoryItemContext";

export interface IHistoryItemProps {
  webtoon?: WebtoonStore;
  item: RecentWebtoon;
}

@inject("webtoon")
@observer
export default class HistoryItem extends React.Component<IHistoryItemProps, any> {
  private deleteScroll() {
    const { item, webtoon } = this.props;
    const { scrolls } = webtoon;
    if (scrolls[item.id] && scrolls[item.id][item.no]) {
      delete scrolls[item.id][item.no];
      webtoon.scrolls = scrolls;
    }
  }

  // private handleContextMenu(e) {
  //   e.preventDefault();
  //   const { item } = this.props;
  //   console.log("contextMenu");
  //   contextMenu.show({
  //     id: `history-item-context-${item.id}-${item.no}`,
  //     event: e,
  //     props: {
  //       webtoon: item
  //     }
  //   });
  // }
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
          <td
            className={
              scrolls[item.id] && scrolls[item.id][item.no]
                ? "view-webtoon webtoonName-td"
                : "webtoonName-td"
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
