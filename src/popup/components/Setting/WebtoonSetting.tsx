import * as React from "react";
import { observer, inject } from "mobx-react";
import OptionStore, { WebtoonOrder } from "../../../store/option";
import WebtoonStore from "../../../store/webtoon";
import SettingCheckBox from "./SettingCheckBox";
import SettingButton from "./SettingButton";

export interface IWebtoonSettingProps {
  option?: OptionStore;
  webtoon?: WebtoonStore;
}

@inject("option", "webtoon")
@observer
export default class WebtoonSetting extends React.Component<IWebtoonSettingProps, null> {
  private readonly orderTypes: WebtoonOrder[] = ["ViewCount", "Update", "StarScore", "TitleName"];
  private readonly orderNames = ["조회순", "업데이트순", "별점순", "제목순"];
  public render() {
    const { option, webtoon } = this.props;
    return (
      <li className="uk-open">
        <a className="uk-accordion-title" href="#">
          웹툰 목록
        </a>
        <SettingCheckBox
          storeKey="saveWebtoonSort"
          text="웹툰 순서 드래그로 조절"
          tooltip="사용자가 드래그로 순서를 지정할 수 있습니다. 설정 시 정렬방식을 사용하지 못합니다."
        />
        <div className="uk-accordion-content">
          <span className="option-title">정렬방식 (드래그로 조절할 시 사용할 수 없습니다)</span>
          <br />
          <ul className="uk-list" id="sort-by" style={{ padding: 0 }}>
            {this.orderTypes.map((val, idx) => (
              <li key={idx}>
                <input
                  className="uk-radio"
                  type="radio"
                  checked={option.orderBy === val}
                  value={val}
                  onChange={event =>
                    event.target.checked
                      ? (option.orderBy = event.target.value as WebtoonOrder)
                      : null
                  }
                  disabled={option.saveWebtoonSort}
                />
                <label htmlFor="sort-pop"> {this.orderNames[idx]}</label>
              </li>
            ))}
          </ul>
          <SettingCheckBox
            storeKey="saveFavorate"
            text="웹툰 즐겨찾기 사용"
            tooltip="웹툰 목록에서 웹툰 즐겨찾기를 사용합니다."
          />
          <SettingButton onClick={() => (webtoon.starWebtoons = [])}>
            즐겨찾기 목록 전체 삭제
          </SettingButton>
          <br />
          <br />
          <span className="option-title">만약 정렬이 이상한 경우 아래 버튼을 클릭해 주세요</span>
          <br />
          <SettingButton
            tooltip="드래그로 설정한 웹툰의 순서를 초기화합니다."
            onClick={() => {
              webtoon.sortWebtoon = {};
              webtoon.setDailyWebtoon();
            }}
          >
            웹툰 순서 초기화
          </SettingButton>
        </div>
      </li>
    );
  }
}
