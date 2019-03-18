import * as React from "react";
import { observer, inject } from "mobx-react";
import OptionStore, {
  ChromeStore,
  WebtoonOrder,
  LinkTarget
} from "../store/option";
import WebtoonStore from "../store/webtoon";
import Wlink from "../components/wlink";

export interface OptionProps {
  option?: OptionStore;
  webtoon?: WebtoonStore;
}

@inject("option", "webtoon")
@observer
export default class Option extends React.Component<OptionProps, any> {
  public render() {
    const { option, webtoon } = this.props;

    return (
      <div className="uk-padding scroll-fixed">
        <ul className="uk-list uk-list-divider" uk-accordion="multiple: true">
          <li className="uk-open">
            <a href="#" className="uk-accordion-title">
              최근 본 웹툰
            </a>
            <div className="uk-accordion-content">
              <p>
                현재
                {` ${webtoon.visitCount}`}
                개의 기록이 있습니다.
              </p>
              <span className="option-title">
                설정 및 웹툰 데이터를 저장할 곳
              </span>
              <ul className="uk-list uk-padding-remove">
                <li>
                  <input
                    type="radio"
                    id="local"
                    className="uk-radio"
                    value="local"
                    onChange={event =>
                      (option.storeLocation = event.target.value as ChromeStore)
                    }
                    checked={option.storeLocation === "local"}
                  />{" "}
                  <label htmlFor="local">
                    로컬 (기록을 컴퓨터에 저장합니다. 동기화되지 않습니다.)
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="sync"
                    className="uk-radio"
                    value="sync"
                    onChange={event =>
                      (option.storeLocation = event.target.value as ChromeStore)
                    }
                    checked={option.storeLocation === "sync"}
                  />{" "}
                  <label htmlFor="sync">
                    계정 (기록을 최대 200개만 저장 가능합니다. 계정에
                    동기화됩니다.)
                  </label>
                </li>
              </ul>
              <p>
                <label
                  htmlFor="historyCount"
                  uk-tooltip="계정: 200개, 로컬: 500개로 제한합니다."
                >
                  최대 기록 개수 (넘으면 예전 기록이 삭제됩니다.):
                </label>{" "}
                <input
                  className="uk-input uk-width-1-5"
                  style={{ height: "30px" }}
                  type="number"
                  min="0"
                  max={option.storeLocation === "sync" ? 200 : 500}
                  id="historyCount"
                  value={option.historyMax}
                  onChange={event =>
                    (option.historyMax = parseInt(event.target.value))
                  }
                />
              </p>
              <button
                id="getWebtoon"
                className="uk-button uk-button-small uk-button-default"
                uk-tooltip="방문기록에서 웹툰 기록을 가져옵니다."
                onClick={() => webtoon.setVisitsFromChrome()}
              >
                방문 기록에서 옮기기
              </button>
              &nbsp;
              <button
                id="deleteWebtoon"
                className="uk-button uk-button-small uk-button-default"
                uk-tooltip="웹툰 기록을 삭제합니다. 사이트에서도 표시하지 않습니다."
              >
                웹툰 기록 삭제
              </button>
              <br />
              <br />
              <span className="option-title">링크를 열 위치</span>
              <br />
              <ul className="uk-list" id="sort-by" style={{ padding: 0 }}>
                <li>
                  <input
                    className="uk-radio"
                    type="radio"
                    id="sort-pop"
                    checked={option.linkTarget === "Current"}
                    value="Current"
                    onChange={event =>
                      (option.linkTarget = event.target.value as LinkTarget)
                    }
                  />
                  <label htmlFor="sort-pop"> 현재 탭</label>
                </li>
                <li>
                  <input
                    className="uk-radio"
                    type="radio"
                    id="sort-stars"
                    checked={option.linkTarget === "Tab"}
                    value="Tab"
                    onChange={event =>
                      (option.linkTarget = event.target.value as LinkTarget)
                    }
                  />
                  <label htmlFor="sort-stars"> 새 탭</label>
                </li>
                <li>
                  <input
                    className="uk-radio"
                    type="radio"
                    id="sort-update"
                    checked={option.linkTarget === "Popup"}
                    value="Popup"
                    onChange={event =>
                      (option.linkTarget = event.target.value as LinkTarget)
                    }
                  />
                  <label htmlFor="sort-update"> 팝업 창</label>
                </li>
              </ul>
            </div>
          </li>
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
                  onChange={event =>
                    (option.saveFavorate = event.target.checked)
                  }
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
          <li className="uk-open">
            <a className="uk-accordion-title" href="#">
              웹툰 페이지
              <span className="uk-text-small">(https://comic.naver.com)</span>
            </a>
            <div className="uk-accordion-content">
              <input
                id="showHistory"
                className="uk-checkbox"
                type="checkbox"
                checked={option.showHistory}
                onChange={event => (option.showHistory = event.target.checked)}
              />
              <label
                htmlFor="showHistory"
                className="option-title"
                uk-tooltip="https://comic.naver.com/webtoon/list.nhn에서 웹툰의 기록을 표시합니다."
              >
                {" "}
                웹툰 리스트 페이지에 기록 표시
              </label>
              <p uk-tooltip="웹툰의 보는 정도를 저장하고 다음에 접속할 때 알려줍니다.">
                <input
                  id="saveScroll"
                  className="uk-checkbox"
                  type="checkbox"
                  checked={option.saveScroll}
                  onChange={event => (option.saveScroll = event.target.checked)}
                />
                <label htmlFor="saveScroll" className="option-title">
                  {" "}
                  웹툰 스크롤 저장 및 알림
                </label>
              </p>
              <button
                id="removeScroll"
                className="uk-button uk-button-small uk-button-default"
                uk-tooltip="스크롤 데이터를 삭제합니다."
              >
                웹툰 스크롤 데이터 삭제
              </button>
            </div>
          </li>
          <li className="uk-open">
            <a className="uk-accordion-title" href="#">
              특수 기능
            </a>
            <div className="uk-accordion-content">
              <p uk-tooltip="스포를 방지하기 위해 댓글을 숨깁니다.">
                <input
                  type="checkbox"
                  className="uk-checkbox"
                  id="hiddenCommant"
                  checked={option.hiddenComment}
                  onChange={event =>
                    (option.hiddenComment = event.target.checked)
                  }
                />
                <label htmlFor="hiddenCommant" className="option-title">
                  {" "}
                  웹툰 댓글 숨기기
                </label>
              </p>
              <p uk-tooltip="웹툰을 다보면 자동으로 다음화로 넘어갑니다. (스크롤을 가장 아래로 내려야함)">
                <input
                  type="checkbox"
                  id="auto-next"
                  className="uk-checkbox"
                  checked={option.autoNext}
                  onChange={event => (option.autoNext = event.target.checked)}
                />
                <label htmlFor="auto-next" className="option-title">
                  {" "}
                  자동넘김
                </label>
              </p>
            </div>
          </li>
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
          <li>
            <a href="#" className="uk-accordion-title">
              개발 정보
            </a>
            <div className="uk-accordion-content">
              <span className="option-title">GitHub </span>
              <Wlink link="https://github.com/tbvjaos510/naver-webtoon-history">
                <a
                  id="togithub"
                  className="uk-icon-button"
                  uk-icon="icon: github"
                />
              </Wlink>

              <br />
              <Wlink link="https://blog.naver.com/dgsw102">
                <a className="option-title uk-link-muted" id="naverBlog">
                  Naver Blog
                </a>
              </Wlink>
            </div>
          </li>
          <li>
            <Wlink link="https://github.com/tbvjaos510/naver-webtoon-history/issues/new?template=naver-webtoon-extension------.md">
              <button
                className="uk-button uk-button-primary uk-button-small"
                id="toIssues"
              >
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
