import * as React from "react";
import OptionStore, { ChromeStore, LinkTarget } from "../../store/option";
import WebtoonStore from "../../store/webtoon";
import { observer, inject } from "mobx-react";
import SettingButton from "./SettingButton";
import { toJS } from "mobx";

export interface RecentSettingProps {
  webtoon?: WebtoonStore;
  option?: OptionStore;
}

interface LinkTargetSetting {
  text: string;
  target: LinkTarget;
}

@inject("option", "webtoon")
@observer
export default class RecentSetting extends React.Component<RecentSettingProps, null> {
  private readonly linkTargetSetting: LinkTargetSetting[] = [
    { text: "새 탭", target: "Tab" },
    { text: "현재 탭", target: "Current" },
    { text: "팝업 창", target: "Popup" },
    { text: "사이드바 (Whale 전용)", target: "Sidebar" }
  ];

  private maintainOne() {
    const { webtoon } = this.props;
    const visits = webtoon.visits;
    Object.keys(visits).forEach(webtoonId => {
      let maxTime = 0;
      let maxNo = null;
      Object.keys(visits[webtoonId]).forEach(no => {
        if (visits[webtoonId][no] > maxTime) {
          if (maxNo) {
            delete visits[webtoonId][maxNo];
          }
          maxTime = visits[webtoonId][no];
          maxNo = no;
        } else {
          delete visits[webtoonId][no];
        }
      });
    });
    webtoon.visits = visits;
    webtoon.setRecentWebtoon();
  }

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
          {
            // 사용 보류. sync의 저쟝용량이 너무 적음
            /*     <span className="option-title">최근 본 웹툰 데이터를 저장할 곳</span>
          <ul className="uk-list uk-padding-remove">
            <li>
              <input
                type="radio"
                id="local"
                className="uk-radio"
                value="local"
                onChange={event => (option.storeLocation = event.target.value as ChromeStore)}
                checked={option.storeLocation === "local"}
              />{" "}
              <label htmlFor="local">로컬 (기록을 컴퓨터에 저장합니다. 동기화되지 않습니다.)</label>
            </li>
            <li>
              <input
                type="radio"
                id="sync"
                className="uk-radio"
                value="sync"
                onChange={event => (option.storeLocation = event.target.value as ChromeStore)}
                checked={option.storeLocation === "sync"}
              />{" "}
              <label htmlFor="sync">
                계정 (기록을 최대 200개만 저장 가능합니다. 계정에 동기화됩니다.)
              </label>
            </li>
          </ul> */
          }
          <p>
            <label
              htmlFor="historyCount"
              uk-tooltip={`최대 ${option.storeLocation === "sync" ? 200 : 1000}개까지 가능합니다`}
            >
              최대 기록 개수 (넘으면 예전 기록이 삭제됩니다.):
            </label>{" "}
            <input
              className="uk-input uk-width-1-5"
              style={{ height: "30px" }}
              type="number"
              min="0"
              max={option.storeLocation === "sync" ? 200 : 1000}
              id="historyCount"
              value={option.historyMax}
              onChange={event => (option.historyMax = parseInt(event.target.value))}
            />
          </p>
          <SettingButton
            onClick={() => webtoon.setVisitsFromChrome()}
            tooltip="방문기록에서 웹툰 기록을 가져옵니다."
            disabled={webtoon.loadingStatus !== "end"}
          >
            방문 기록에서 옮기기
          </SettingButton>
          &nbsp;
          <SettingButton
            onClick={() =>
              whale.storage[option.storeLocation].remove(["webtoon", "visits", "scrolls"])
            }
            tooltip="웹툰 기록을 삭제합니다. 사이트에서도 표시하지 않습니다."
            disabled={webtoon.loadingStatus !== "end"}
          >
            웹툰 기록 전체 삭제
          </SettingButton>
          <br />
          <br />
          <span className="option-title">링크를 열 위치</span>
          <br />
          <ul className="uk-list" style={{ padding: 0 }}>
            {this.linkTargetSetting.map((item, index) => {
              const id = `link-${item.text.toLowerCase()}`;
              return (
                <li key={index}>
                  <input
                    className="uk-radio"
                    type="radio"
                    id={id}
                    checked={option.linkTarget === item.target}
                    value={item.target}
                    onChange={event =>
                      event.target.checked && (option.linkTarget = event.target.value as LinkTarget)
                    }
                  />
                  <label htmlFor={id}> {item.text}</label>
                </li>
              );
            })}
          </ul>
          <br />
          <SettingButton
            onClick={() => {
              this.maintainOne();
            }}
            tooltip="웹툰의 기록에서 동일한 웹툰을 최근 본 회차 하나만을 남기고 전부 삭제합니다."
            disabled={webtoon.loadingStatus !== "end"}
          >
            웹툰마다 기록 하나씩만 남기기
          </SettingButton>
        </div>
      </li>
    );
  }
}
