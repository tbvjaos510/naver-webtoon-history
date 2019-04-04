import * as React from "react";
import Wlink from "../wlink";

export interface DevelopInfoProps {}

export default class DevelopInfo extends React.Component<DevelopInfoProps, null> {
  public render() {
    return (
      <li>
        <a href="#" className="uk-accordion-title">
          개발 정보
        </a>
        <div className="uk-accordion-content">
          <span className="option-title">GitHub </span>
          <Wlink link="https://github.com/tbvjaos510/naver-webtoon-history">
            <a id="togithub" className="uk-icon-button" uk-icon="icon: github" />
          </Wlink>

          <br />
          <Wlink link="https://blog.naver.com/dgsw102">
            <a className="option-title uk-link-muted" id="naverBlog">
              Naver Blog
            </a>
          </Wlink>
        </div>
      </li>
    );
  }
}
