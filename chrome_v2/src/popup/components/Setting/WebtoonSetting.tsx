import * as React from "react";
import { observer, inject } from "mobx-react";
import OptionStore, { WebtoonOrder } from "../../store/option";
import WebtoonStore from "../../store/webtoon";

export interface WebtoonSettingProps {
  option?: OptionStore;
  webtoon?: WebtoonStore;
}

@inject("option", "webtoon")
@observer
export default class WebtoonSetting extends React.Component<WebtoonSettingProps, null> {
  private readonly orderTypes: WebtoonOrder[] = ["ViewCount", "Update", "StarScore", "TitleName"];
  private readonly orderNames = ["조회순", "업데이트순", "별점순", "제목순"];
  public render() {
    const { option, webtoon } = this.props;
    return (
      <li className="uk-open">
        <a className="uk-accordion-title" href="#">
          웹툰 목록
        </a>
        <p
          className="option-title"
          uk-tooltip="사용자가 드래그로 순서를 지정할 수 있습니다.<br>설정 시 정렬방식을 사용하지 못합니다."
        >
          <input
            className="uk-checkbox"
            type="checkbox"
            id="saveWsort"
            onChange={event => (option.saveWebtoonSort = event.target.checked)}
            checked={option.saveWebtoonSort}
          />
          <label htmlFor="saveWsort"> 웹툰 순서 드래그로 조절</label>
        </p>
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
          <p className="option-title" uk-tooltip="웹툰 목록에서 웹툰 즐겨찾기를 사용합니다.">
            <input
              type="checkbox"
              id="saveFavorate"
              className="uk-checkbox"
              onChange={event => (option.saveFavorate = event.target.checked)}
              checked={option.saveFavorate}
            />
            <label htmlFor="saveFavorate"> 웹툰 즐겨찾기 사용</label>
          </p>
          <button className="uk-button uk-button-small uk-button-default" id="deleteFavorate">
            즐겨찾기 목록 전체 삭제
          </button>
          <br />
          <br />
          <span className="option-title">만약 정렬이 이상한 경우 아래 버튼을 클릭해 주세요</span>
          <br />
          <button
            id="resetWsort"
            className="uk-button uk-button-small uk-button-default"
            uk-tooltip="드래그로 설정한 웹툰의 순서를 초기화합니다."
            onClick={() => {
              webtoon.sortWebtoon = {};
              webtoon.setDailyWebtoon();
            }}
          >
            웹툰 순서 초기화
          </button>
        </div>
      </li>
    );
  }
}
