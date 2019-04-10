import * as React from "react";
import OptionStore from "../../store/option";
import WebtoonStore from "../../store/webtoon";
import { observer, inject } from "mobx-react";
import SettingCheckBox from "./SettingCheckBox";
import SettingButton from "./SettingButton";

export interface PageSettingProps {
  webtoon?: WebtoonStore;
  option?: OptionStore;
}

@inject("option", "webtoon")
@observer
export default class PageSetting extends React.Component<PageSettingProps, null> {
  private getContextMenuGrant(event: React.ChangeEvent<HTMLInputElement>) {
    const { option } = this.props;
    if (event.target.checked) {
      whale.permissions.contains(
        {
          permissions: ["contextMenus"]
        },
        result => {
          if (result) option.useContextMenu = true;
          else {
            whale.permissions.request(
              {
                permissions: ["contextMenus"]
              },
              granted => {
                if (granted) option.useContextMenu = true;
                else event.target.checked = false;
              }
            );
          }
        }
      );
    } else {
      option.useContextMenu = false;
    }
  }

  public render() {
    const { webtoon, option } = this.props;
    return (
      <li className="uk-open">
        <a className="uk-accordion-title" href="#">
          웹툰 페이지
          <span className="uk-text-small">(https://comic.naver.com)</span>
        </a>
        <div className="uk-accordion-content">
          <SettingCheckBox
            storeKey="showHistory"
            text="웹툰 리스트 페이지에 기록 표시"
            tooltip="웹툰 페이지에서 웹툰의 기록을 표시합니다."
          />
          {/* <SettingCheckBox
            key="useContextMenu"
            text="웹툰 페이지에서 우클릭 바로가기 사용"
            tooltip="웹툰 페이지에서 웹툰 링크를 우클릭할때 Extension 메뉴가 나타납니다."
          /> */}
          <SettingCheckBox
            storeKey="saveScroll"
            text="웹툰 스크롤 저장 및 알림"
            tooltip="웹툰의 보는 정도를 저장하고 다음에 접속할 때 알려줍니다."
          />

          {option.saveScroll ? (
            <SettingCheckBox
              storeKey="scrollAlert"
              text="알림창으로 스크롤 묻기"
              tooltip="이어 보는 여부를 알림창으로 물어봅니다."
            />
          ) : null}
          <SettingButton
            onClick={() => {
              webtoon.scrolls = {};
            }}
            tooltip="스크롤 데이터를 삭제합니다."
          >
            웹툰 스크롤 데이터 삭제
          </SettingButton>
        </div>
      </li>
    );
  }
}
