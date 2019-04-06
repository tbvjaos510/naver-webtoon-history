import * as React from "react";
import { WebtoonInfoType } from "../../request";
import Wlink from "../wlink";
import OptionStore from "../../store/option";
import { observer, inject } from "mobx-react";
import WebtoonStore from "../../store/webtoon";
import * as distance from "date-fns/distance_in_words_to_now";
import * as ko from "date-fns/locale/ko";
import { toJS } from "mobx";
export interface DailyItemProps {
  item: WebtoonInfoType;
  option?: OptionStore;
  webtoon?: WebtoonStore;
}

@inject("option", "webtoon")
@observer
export default class DailyItem extends React.Component<DailyItemProps, any> {
  public onStarChanged() {
    console.log("starChanged");
    const { webtoon, item } = this.props;
    if (webtoon.starWebtoons[item.id]) {
      delete webtoon.starWebtoons[item.id];
    } else {
      webtoon.starWebtoons[item.id] = true;
    }

    // Chrome Storage 적용
    webtoon.starWebtoons = webtoon.starWebtoons;
  }

  private getRecentWebtoon() {
    const { webtoon, item } = this.props;
    const find = webtoon.recentWebtoon.find(value => {
      return value.id === item.id;
    });
    if (find) {
      const timeLocale =
        distance(find.lastVisit, {
          locale: ko,
          addSuffix: true
        }) + "에 봄";
      return (
        <Wlink link={`https://comic.naver.com/webtoon/detail.nhn?titleId=${find.id}&no=${find.no}`}>
          <a className="uk-link-muted webtoon-link" uk-tooltip={timeLocale}>
            {find.noname}
          </a>
        </Wlink>
      );
    }
  }

  public render() {
    const { option, item, webtoon } = this.props;
    return (
      <div className="uk-card uk-card-small uk-card-default">
        <div className="uk-card-media-top">
          <img src={item.img} alt={item.title} className="webtoon-link" />
          {item.isUp ? <em className="ico updt" /> : null}
          {item.isRest ? <em className="ico break" /> : null}
        </div>
        <div className="uk-card-body uk-padding-small uk-padding-remove-right uk-padding-remove-left">
          <Wlink link={item.link}>
            <a className="uk-link-muted webtoon-link">{item.title}</a>
          </Wlink>
          <br />
          {this.getRecentWebtoon()}
          <br />
          {option.saveFavorate ? (
            <React.Fragment>
              <br />
              <a
                className={"favo " + (webtoon.starWebtoons[item.id] ? "stared" : "")}
                uk-icon="icon: star;"
                onClick={() => this.onStarChanged()}
              />
            </React.Fragment>
          ) : null}
        </div>
      </div>
    );
  }
}
