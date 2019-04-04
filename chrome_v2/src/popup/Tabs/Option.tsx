import * as React from "react";
import { observer, inject } from "mobx-react";
import OptionStore, { ChromeStore, WebtoonOrder, LinkTarget } from "../store/option";
import WebtoonStore from "../store/webtoon";
import Wlink from "../components/wlink";
import RecentSetting from "../components/Setting/RecentSetting";
import WebtoonSetting from "../components/Setting/WebtoonSetting";
import PageSetting from "../components/Setting/PageSetting";
import SpecialSetting from "../components/Setting/SpecialSetting";
import StorageSetting from "../components/Setting/StorageSetting";
import DevelopInfo from "../components/Setting/DevelopInfo";

export interface OptionProps {
  option?: OptionStore;
  webtoon?: WebtoonStore;
}

@inject("option", "webtoon")
@observer
export default class Option extends React.Component<OptionProps, null> {
  public render() {
    const { option, webtoon } = this.props;

    return (
      <div className="uk-padding scroll-fixed">
        <ul className="uk-list uk-list-divider" uk-accordion="multiple: true">
          <RecentSetting />
          <WebtoonSetting />
          <PageSetting />
          <SpecialSetting />
          <StorageSetting />
          <DevelopInfo />
          <li>
            <Wlink link="https://github.com/tbvjaos510/naver-webtoon-history/issues/new?template=naver-webtoon-extension------.md">
              <button className="uk-button uk-button-primary uk-button-small" id="toIssues">
                오류 제보
              </button>
            </Wlink>
            <button
              id="removeOption"
              className="uk-button uk-button-small uk-button-danger uk-float-right"
            >
              설정 초기화
            </button>
          </li>
        </ul>
      </div>
    );
  }
}
