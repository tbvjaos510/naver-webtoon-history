import * as React from "react";
import { WebtoonType } from "../request";
import Wlink from "./wlink";
import OptionStore from "../store/option";
import { observer, inject } from "mobx-react";

export interface DailyItemProps {
  item: WebtoonType;
  option?: OptionStore;
}

@inject("option")
@observer
export default class DailyItem extends React.Component<DailyItemProps, any> {
  public starClickHandler() {
    
  }

  public render() {
    const { item, option } = this.props;

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
                className="favo"
                uk-icon="icon: star;"
                onClick={event => this.starClickHandler()}
              />
            </React.Fragment>
          ) : null}
        </div>
      </div>
    );
  }
}
