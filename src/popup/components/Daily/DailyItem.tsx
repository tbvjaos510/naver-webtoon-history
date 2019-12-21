import * as distance from 'date-fns/distance_in_words_to_now';
import * as ko from 'date-fns/locale/ko';
import { inject, observer } from 'mobx-react';
import * as React from 'react';

import OptionStore from '../../../store/option';
import WebtoonStore from '../../../store/webtoon';
import { WebtoonInfoType } from '../../../tools/request';
import Wlink from '../Wlink';

export interface IDailyItemProps {
  item: WebtoonInfoType;
  option?: OptionStore;
  webtoon?: WebtoonStore;
}

@inject("option", "webtoon")
@observer
export default class DailyItem extends React.Component<IDailyItemProps, any> {
  public onStarChanged() {
    console.log("starChanged");
    const { webtoon, item } = this.props;
    const idx = webtoon.starWebtoons.indexOf(item.id);
    if (idx != -1) {
      ga("send", "event", "DailyItem", "unStarWebtoon", item.id);
      webtoon.starWebtoons.splice(idx, 1);
    } else {
      ga("send", "event", "DailyItem", "starWebtoon", item.id);
      webtoon.starWebtoons.push(item.id);
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
        <Wlink
          link={`https://comic.naver.com/webtoon/detail.nhn?titleId=${find.id}&no=${find.no}`}
          onClick={() => {
            ga(
              "send",
              "event",
              "DailyItem",
              "openRecentWebtoon",
              `${item.title}(${find.id}/${find.no})`
            );
          }}
        >
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
      <div
        className={`uk-card uk-card-small uk-card-default ${
          option.saveWebtoonSort ? "hover-pointer" : ""
        }`}
      >
        <div className="uk-card-media-top">
          <img src={item.img} alt={item.title} className="webtoon-link" />
          {item.isUp ? <em className="ico updt" /> : null}
          {item.isRest ? <em className="ico break" /> : null}
        </div>
        <div className="uk-card-body uk-padding-small uk-padding-remove-right uk-padding-remove-left">
          <Wlink
            link={item.link}
            onClick={() => {
              ga("send", "event", "DailyItem", "openWebtoon", `${item.title}(${item.id})`);
            }}
          >
            <a className="uk-link-muted webtoon-link">{item.title}</a>
          </Wlink>
          <br />
          {this.getRecentWebtoon()}
          {option.saveFavorate ? (
            <React.Fragment>
              <br />
              <a
                className={"favo " + (webtoon.starWebtoons.indexOf(item.id) != -1 ? "stared" : "")}
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