import * as React from "react";
import { observer, inject } from "mobx-react";
import OptionStore, { ChromeStore, WebtoonOrder, LinkTarget } from "../../store/option";
import WebtoonStore from "../../store/webtoon";
import Wlink from "../components/wlink";
import RecentSetting from "../components/Setting/RecentSetting";
import WebtoonSetting from "../components/Setting/WebtoonSetting";
import PageSetting from "../components/Setting/PageSetting";
import SpecialSetting from "../components/Setting/SpecialSetting";
import StorageSetting from "../components/Setting/StorageSetting";
import DevelopInfo from "../components/Setting/DevelopInfo";
import SettingButton from "../components/Setting/SettingButton";

export interface IOptionProps {
  option?: OptionStore;
}

@inject("option")
@observer
export default class Option extends React.Component<IOptionProps, null> {
  public render() {
    const { option } = this.props;

    return (
      <div className="uk-padding">
        <ul className="uk-list uk-list-divider" uk-accordion="multiple: true">
          <RecentSetting />
          <WebtoonSetting />
          <PageSetting />
          <SpecialSetting />
          <StorageSetting />
          <DevelopInfo />
          <li>
            <Wlink
              link={`mailto:tbvjaos510@naver.com?subject=${encodeURIComponent(
                "Whale 익스텐션 오류 제보"
              )}&body=${encodeURIComponent(
                "version: " + chrome.runtime.getManifest().version + "\n"
              )}`}
            >
              <SettingButton tooltip="클릭하면 메일을 보냅니다." onClick={() => {}} type="primary">
                오류 제보
              </SettingButton>
            </Wlink>
            <div style={{ float: "right" }}>
              <SettingButton
                tooltip="설정을 초기화합니다."
                onClick={() => option.resetOption()}
                type="danger"
              >
                설정 초기화
              </SettingButton>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}
