import * as React from "react";
import OptionStore, { ChromeStore } from "../../store/option";
import { observer, inject } from "mobx-react";

export interface StorageSettingProps {
  option?: OptionStore;
}

@inject("option")
@observer
export default class StorageSetting extends React.Component<StorageSettingProps, null> {
  public render() {
    const { option } = this.props;
    return (
      <li>
        <a className="uk-accordion-title" href="#">
          저장 공간
        </a>
        <div className="uk-accordion-content">
          <p className="option-title">
            개발용 설정입니다.
            <br />
            만약 익스텐션에 오류가 있을 시 사용해 주세요.
          </p>
          <ul className="uk-list" style={{ padding: 0 }}>
            <li>
              <span className="option-title">
                로컬 :<span> {option.localUsage}</span>byte 사용중
              </span>{" "}
              <button
                className="uk-button uk-button-small uk-button-default"
                onClick={() => option.resetStore("local")}
                uk-tooltip="로컬 초기화"
              >
                초기화
              </button>
            </li>
            <li>
              <span className="option-title">
                계정 :<span> {option.syncUsage}</span>byte 사용중
              </span>{" "}
              <button
                className="uk-button uk-button-small uk-button-default"
                onClick={() => option.resetStore("sync")}
                uk-tooltip="계정 초기화"
              >
                초기화
              </button>
            </li>
            <li>
              <input
                type="checkbox"
                id="use-imglog"
                className="uk-checkbox"
                checked={option.useImgLog}
                onChange={event => (option.useImgLog = (event.target as HTMLInputElement).checked)}
              />
              <label
                htmlFor="use-imglog"
                className="option-title"
                uk-tooltip="최근 본 웹툰의 로딩을 빠르게 합니다."
              >
                {" "}
                웹툰 타이틀 정보와 섬네일 정보 별도저장
              </label>
            </li>
            <li>
              <button
                id="reset-all"
                className="uk-button uk-button-small uk-button-danger"
                uk-tooltip="모든 데이터를 삭제합니다."
                onClick={() => {
                  option.resetStore("local");
                  option.resetStore("sync");
                  location.reload();
                }}
              >
                모든 데이터 초기화
              </button>
            </li>
          </ul>
          <p />
        </div>
      </li>
    );
  }
}
