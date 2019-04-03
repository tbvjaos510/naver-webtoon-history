import * as React from "react";
import OptionStore from "../../store/option";
import WebtoonStore from "../../store/webtoon";
import { observer, inject } from "mobx-react";

export interface PageSettingProps {
  webtoon?: WebtoonStore;
  option?: OptionStore;
}

@inject("option", "webtoon")
@observer
export default class PageSetting extends React.Component<
  PageSettingProps,
  null
> {
  public render() {
    const { webtoon, option } = this.props;
    return (
      <li className="uk-open">
        <a className="uk-accordion-title" href="#">
          웹툰 페이지
          <span className="uk-text-small">(https://comic.naver.com)</span>
        </a>
        <div className="uk-accordion-content">
          <input
            id="showHistory"
            className="uk-checkbox"
            type="checkbox"
            checked={option.showHistory}
            onChange={event => (option.showHistory = event.target.checked)}
          />
          <label
            htmlFor="showHistory"
            className="option-title"
            uk-tooltip="https://comic.naver.com/webtoon/list.nhn에서 웹툰의 기록을 표시합니다."
          >
            {" "}
            웹툰 리스트 페이지에 기록 표시
          </label>
          <p uk-tooltip="웹툰의 보는 정도를 저장하고 다음에 접속할 때 알려줍니다.">
            <input
              id="saveScroll"
              className="uk-checkbox"
              type="checkbox"
              checked={option.saveScroll}
              onChange={event => (option.saveScroll = event.target.checked)}
            />
            <label htmlFor="saveScroll" className="option-title">
              {" "}
              웹툰 스크롤 저장 및 알림
            </label>
          </p>
          {option.saveScroll ? (
            <p uk-tooltip="이어 보는 여부를 알림창으로 물어봅니다.">
              <input
                id="scrollAlert"
                className="uk-checkbox"
                type="checkbox"
                checked={option.scrollAlert}
                onChange={event => (option.scrollAlert = event.target.checked)}
              />
              <label htmlFor="scrollAlert" className="option-title">
                {" "}
                알림창으로 스크롤 묻기
              </label>
            </p>
          ) : null}
          <button
            id="removeScroll"
            className="uk-button uk-button-small uk-button-default"
            uk-tooltip="스크롤 데이터를 삭제합니다."
            onClick={() => {
              webtoon.scrolls = {};
            }}
          >
            웹툰 스크롤 데이터 삭제
          </button>
        </div>
      </li>
    );
  }
}
