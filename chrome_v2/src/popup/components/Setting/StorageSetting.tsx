import * as React from "react";
import OptionStore from "../../store/option";
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
            사용하지 않는 저장공간은 삭제해 주세요
            <br /> (웹툰 정보, 웹툰 기록, 이미지 로그)
          </p>
          <ul className="uk-list" style={{ padding: 0 }}>
            <li>
              <span className="option-title">
                로컬 :<span> {option.localUsage}</span>byte 사용중
              </span>{" "}
              <button
                className="uk-button uk-button-small uk-button-default"
                onClick={() => option.resetStore("local")}
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
              <label htmlFor="use-imglog" className="option-title">
                {" "}
                이미지 로그 사용(로딩이 빨라집니다)
              </label>
            </li>
            <li>
              <button
                id="reset-all"
                className="uk-button uk-button-small uk-button-danger"
                uk-tooltip="웹툰 정보, 웹툰 기록, 이미지 로그, 웹툰 순서, 설정, 스크롤 정보를 삭제합니다."
                onClick={() => {
                  option.resetStore("local");
                  option.resetStore("sync");
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
