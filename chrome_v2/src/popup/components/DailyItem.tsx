import * as React from "react";
import { WebtoonInfoType } from "../request";
import Wlink from "./wlink";
import OptionStore from "../store/option";
import { observer, inject } from "mobx-react";
import WebtoonStore from "../store/webtoon";

export interface DailyItemProps {
  item: WebtoonInfoType;
  option?: OptionStore;
  webtoon?: WebtoonStore;
}

export interface DailyItemStates {
  item: WebtoonInfoType;
}

@inject("option", "webtoon")
@observer
export default class DailyItem extends React.Component<
  DailyItemProps,
  DailyItemStates
> {
  state = {
    item: this.props.item
  };
  public onStarChanged() {
    const id = this.state.item.id;
    if (this.props.webtoon.starWebtoons[id]) {
      delete this.props.webtoon.starWebtoons[id];
    } else {
      this.props.webtoon.starWebtoons[id] = true;
    }
    this.props.webtoon.starWebtoons = this.props.webtoon.starWebtoons;
    this.state.item.stared = !this.state.item.stared;
    this.setState({
      item: this.state.item
    });
  }

  public render() {
    const { option } = this.props;
    const { item } = this.state;
    return (
      <div className="uk-card uk-card-small uk-card-default">
        <div className="uk-card-media-top">
          <img src={item.img} alt={item.title} className="webtoon-link" />
          {item.isUp ? <em className="ico-updt" /> : null}
          {item.isRest ? <em className="ico-break" /> : null}
        </div>
        <div className="uk-card-body uk-padding-small uk-padding-remove-right uk-padding-remove-left">
          <Wlink link={item.link}>
            <a className="uk-link-muted webtoon-link">{item.title}</a>
          </Wlink>
          <br />
          {option.saveFavorate ? (
            <React.Fragment>
              <br />
              <a
                className={"favo " + (item.stared ? "stared" : "")}
                uk-icon="icon: star;"
                onClick={event => this.onStarChanged()}
              />
            </React.Fragment>
          ) : null}
        </div>
      </div>
    );
  }
}
