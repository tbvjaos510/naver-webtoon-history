import * as React from "react";
import OptionStore, { ChromeStore } from "../../../store/option";
import { observer, inject } from "mobx-react";
import SettingCheckBox from "./SettingCheckBox";
import SettingButton from "./SettingButton";

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
              <SettingButton
                tooltip="로컬 데이터 초기화"
                onClick={() => option.resetStore("local")}
              >
                초기화
              </SettingButton>
            </li>
            <li>
              <span className="option-title">
                계정 :<span> {option.syncUsage}</span>byte 사용중
              </span>{" "}
              <SettingButton
                tooltip="계정 데이터 초기화"
                onClick={() => {
                  option.resetStore("sync");
                }}
              >
                초기화
              </SettingButton>
            </li>
            <li>
              <SettingCheckBox
                storeKey="useImgLog"
                text="웹툰 타이틀 정보와 섬네일 정보 별도저장"
                tooltip="최근 본 웹툰의 로딩을 빠르게 합니다."
              />{" "}
            </li>
            <li>
              <SettingButton
                tooltip="모든 데이터를 삭제합니다."
                onClick={() => {
                  option.resetStore("local");
                  option.resetStore("sync");
                  location.reload();
                }}
                type="danger"
              >
                모든 데이터 초기화
              </SettingButton>
            </li>
          </ul>
          <p />
        </div>
      </li>
    );
  }
}
