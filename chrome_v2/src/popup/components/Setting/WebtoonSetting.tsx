import * as React from "react";
import OptionStore, { WebtoonOrder } from "../../store/option";
import { observer, inject } from "mobx-react";

export interface WebtoonSettingProps {
  option?: OptionStore;
}

@inject("option")
@observer
export default class WebtoonSetting extends React.Component<
  WebtoonSettingProps,
  null
> {
  public render() {
    const { option } = this.props;
    return (
      <li className="uk-open">
        <a className="uk-accordion-title" href="#">
          웹툰 목록
        </a>
        <div className="uk-accordion-content">
          <span className="option-title">
            정렬방식 (변경시 순서 변경 기록을 삭제합니다.)
          </span>
          <br />
          <ul className="uk-list" id="sort-by" style={{ padding: 0 }}>
            <li>
              <input
                className="uk-radio"
                type="radio"
                id="sort-pop"
                checked={option.orderBy === "ViewCount"}
                value="ViewCount"
                onChange={event =>
                  (option.orderBy = event.target.value as WebtoonOrder)
                }
              />
              <label htmlFor="sort-pop"> 조회순</label>
            </li>
            <li>
              <input
                className="uk-radio"
                type="radio"
                id="sort-update"
                value="Update"
                checked={option.orderBy === "Update"}
                onChange={event =>
                  (option.orderBy = event.target.value as WebtoonOrder)
                }
              />
              <label htmlFor="sort-update"> 업데이트순</label>
            </li>
            <li>
              <input
                className="uk-radio"
                type="radio"
                id="sort-stars"
                value="StarScore"
                checked={option.orderBy === "StarScore"}
                onChange={event =>
                  (option.orderBy = event.target.value as WebtoonOrder)
                }
              />
              <label htmlFor="sort-stars"> 별점순</label>
            </li>
            <li>
              <input
                className="uk-radio"
                type="radio"
                id="sort-names"
                value="TitleName"
                checked={option.orderBy === "TitleName"}
                onChange={event =>
                  (option.orderBy = event.target.value as WebtoonOrder)
                }
              />
              <label htmlFor="sort-names"> 제목순</label>
            </li>
          </ul>
          <p
            className="option-title"
            uk-tooltip="웹툰 목록에서 웹툰 즐겨찾기를 사용합니다."
          >
            <input
              type="checkbox"
              id="saveFavorate"
              className="uk-checkbox"
              onChange={event => (option.saveFavorate = event.target.checked)}
              checked={option.saveFavorate}
            />
            <label htmlFor="saveFavorate"> 웹툰 즐겨찾기 사용</label>
          </p>
          <button
            className="uk-button uk-button-small uk-button-default"
            id="deleteFavorate"
          >
            즐겨찾기 목록 삭제
          </button>
          <br />
          <br />
          <span className="option-title">
            만약 정렬이 이상한 경우 아래 버튼을 클릭해 주세요
          </span>
          <br />
          <button
            id="resetWsort"
            className="uk-button uk-button-small uk-button-default"
            uk-tooltip="드래그로 설정한 웹툰의 순서를 초기화합니다."
          >
            웹툰 순서 초기화
          </button>
          <br />
          <p
            className="option-title"
            uk-tooltip="사용자가 드래그로 순서를 지정할 수 있습니다."
          >
            <input
              className="uk-checkbox"
              type="checkbox"
              id="saveWsort"
              onChange={event =>
                (option.saveWebtoonSort = event.target.checked)
              }
              checked={option.saveWebtoonSort}
            />
            <label htmlFor="saveWsort"> 사용자 웹툰 순서 저장</label>
          </p>
        </div>
      </li>
    );
  }
}
