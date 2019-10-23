import * as React from 'react';

import Wlink from '../Wlink';
import SettingButton from './Inputs/SettingButton';

export interface IDevelopInfoProps {}

export default class DevelopInfo extends React.Component<IDevelopInfoProps, null> {
  public render() {
    return (
      <li>
        <a href="#" className="uk-accordion-title">
          개발 정보
        </a>
        <div className="uk-accordion-content">
          <Wlink
            link="https://github.com/tbvjaos510/naver-webtoon-history"
            forceTab={true}
            onClick={() => {
              ga("send", "event", "popup", "openGithub");
            }}
          >
            <a id="togithub" className="uk-icon-button" uk-icon="icon: github" />
          </Wlink>

          <Wlink
            link="https://blog.naver.com/dgsw102"
            forceTab={true}
            onClick={() => {
              ga("send", "event", "popup", "openNaverBlog");
            }}
          >
            <a className="option-title uk-link-muted" id="naverBlog">
              Naver Blog
            </a>
          </Wlink>

          <br />
          <SettingButton
            onClick={() => {
              ga("send", "event", "popup", "showUpdatePopup");
              window.dispatchEvent(new Event("extensionUpdate"));
            }}
            tooltip="업데이트 내용 팝업을 띄웁니다."
            type="primary"
          >
            업데이트 내용 보기
          </SettingButton>
        </div>
      </li>
    );
  }
}
