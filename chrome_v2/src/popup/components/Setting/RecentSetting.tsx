import * as React from "react";
import OptionStore, { ChromeStore, LinkTarget } from "../../store/option";
import WebtoonStore from "../../store/webtoon";
import { observer, inject } from "mobx-react";

export interface RecentSettingProps {
  webtoon?: WebtoonStore;
  option?: OptionStore;
}

@inject("option", "webtoon")
@observer
export default class RecentSetting extends React.Component<
  RecentSettingProps,
  null
> {
  public render() {
    const { webtoon, option } = this.props;
    return (
      <li className="uk-open">
        <a href="#" className="uk-accordion-title">
          최근 본 웹툰
        </a>
        <div className="uk-accordion-content">
          <p>
            현재
            {` ${webtoon.visitCount}`}
            개의 기록이 있습니다.
          </p>
          <span className="option-title">설정 및 웹툰 데이터를 저장할 곳</span>
          <ul className="uk-list uk-padding-remove">
            <li>
              <input
                type="radio"
                id="local"
                className="uk-radio"
                value="local"
                onChange={event =>
                  (option.storeLocation = event.target.value as ChromeStore)
                }
                checked={option.storeLocation === "local"}
              />{" "}
              <label htmlFor="local">
                로컬 (기록을 컴퓨터에 저장합니다. 동기화되지 않습니다.)
              </label>
            </li>
            <li>
              <input
                type="radio"
                id="sync"
                className="uk-radio"
                value="sync"
                onChange={event =>
                  (option.storeLocation = event.target.value as ChromeStore)
                }
                checked={option.storeLocation === "sync"}
              />{" "}
              <label htmlFor="sync">
                계정 (기록을 최대 200개만 저장 가능합니다. 계정에 동기화됩니다.)
              </label>
            </li>
          </ul>
          <p>
            <label
              htmlFor="historyCount"
              uk-tooltip="계정: 200개, 로컬: 500개로 제한합니다."
            >
              최대 기록 개수 (넘으면 예전 기록이 삭제됩니다.):
            </label>{" "}
            <input
              className="uk-input uk-width-1-5"
              style={{ height: "30px" }}
              type="number"
              min="0"
              max={option.storeLocation === "sync" ? 200 : 500}
              id="historyCount"
              value={option.historyMax}
              onChange={event =>
                (option.historyMax = parseInt(event.target.value))
              }
            />
          </p>
          <button
            id="getWebtoon"
            className="uk-button uk-button-small uk-button-default"
            uk-tooltip="방문기록에서 웹툰 기록을 가져옵니다."
            onClick={() => webtoon.setVisitsFromChrome()}
          >
            방문 기록에서 옮기기
          </button>
          &nbsp;
          <button
            id="deleteWebtoon"
            className="uk-button uk-button-small uk-button-default"
            uk-tooltip="웹툰 기록을 삭제합니다. 사이트에서도 표시하지 않습니다."
          >
            웹툰 기록 삭제
          </button>
          <br />
          <br />
          <span className="option-title">링크를 열 위치</span>
          <br />
          <ul className="uk-list" id="sort-by" style={{ padding: 0 }}>
            <li>
              <input
                className="uk-radio"
                type="radio"
                id="sort-pop"
                checked={option.linkTarget === "Current"}
                value="Current"
                onChange={event =>
                  (option.linkTarget = event.target.value as LinkTarget)
                }
              />
              <label htmlFor="sort-pop"> 현재 탭</label>
            </li>
            <li>
              <input
                className="uk-radio"
                type="radio"
                id="sort-stars"
                checked={option.linkTarget === "Tab"}
                value="Tab"
                onChange={event =>
                  (option.linkTarget = event.target.value as LinkTarget)
                }
              />
              <label htmlFor="sort-stars"> 새 탭</label>
            </li>
            <li>
              <input
                className="uk-radio"
                type="radio"
                id="sort-update"
                checked={option.linkTarget === "Popup"}
                value="Popup"
                onChange={event =>
                  (option.linkTarget = event.target.value as LinkTarget)
                }
              />
              <label htmlFor="sort-update"> 팝업 창</label>
            </li>
          </ul>
        </div>
      </li>
    );
  }
}
