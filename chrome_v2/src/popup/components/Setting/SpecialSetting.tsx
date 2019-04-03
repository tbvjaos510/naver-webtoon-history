import * as React from "react";
import OptionStore from "../../store/option";
import WebtoonStore from "../../store/webtoon";
import { observer, inject } from "mobx-react";

export interface SpecialSettingProps {
  webtoon?: WebtoonStore;
  option?: OptionStore;
}

@inject("option", "webtoon")
@observer
export default class SpecialSetting extends React.Component<
  SpecialSettingProps,
  null
> {
  public render() {
    const { webtoon, option } = this.props;
    return (
      <li className="uk-open">
        <a className="uk-accordion-title" href="#">
          특수 기능
        </a>
        <div className="uk-accordion-content">
          <p uk-tooltip="스포를 방지하기 위해 댓글을 숨깁니다.">
            <input
              type="checkbox"
              className="uk-checkbox"
              id="hiddenCommant"
              checked={option.hiddenComment}
              onChange={event => (option.hiddenComment = event.target.checked)}
            />
            <label htmlFor="hiddenCommant" className="option-title">
              {" "}
              웹툰 댓글 숨기기
            </label>
          </p>
          <p uk-tooltip="웹툰을 다보면 자동으로 다음화로 넘어갑니다. (스크롤을 가장 아래로 내려야함)">
            <input
              type="checkbox"
              id="auto-next"
              className="uk-checkbox"
              checked={option.autoNext}
              onChange={event => (option.autoNext = event.target.checked)}
            />
            <label htmlFor="auto-next" className="option-title">
              {" "}
              자동넘김
            </label>
          </p>
        </div>
      </li>
    );
  }
}
