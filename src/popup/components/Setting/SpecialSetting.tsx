import * as React from "react";
import OptionStore from "../../../store/option";
import WebtoonStore from "../../../store/webtoon";
import { observer, inject } from "mobx-react";
import SettingCheckBox from "./Inputs/SettingCheckBox";

export interface ISpecialSettingProps {
  webtoon?: WebtoonStore;
  option?: OptionStore;
}

@inject("option", "webtoon")
@observer
export default class SpecialSetting extends React.Component<ISpecialSettingProps, null> {
  public render() {
    const { webtoon, option } = this.props;
    return (
      <li className="uk-open">
        <a className="uk-accordion-title" href="#">
          특수 기능
        </a>
        <div className="uk-accordion-content">
          <SettingCheckBox
            storeKey="hiddenComment"
            text="웹툰 댓글 숨기기"
            tooltip="스포를 방지하기 위해 댓글을 숨깁니다."
          />
          <SettingCheckBox
            storeKey="autoNext"
            text="자동넘김"
            tooltip="웹툰을 다보면 자동으로 다음화로 넘어갑니다. (스크롤을 가장 아래로 내려야함)"
          />
        </div>
      </li>
    );
  }
}
