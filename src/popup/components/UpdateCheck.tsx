import * as React from "react";
import axios from "axios";
import * as ReactMarkdown from "react-markdown";
import Wlink from "./wlink";

export interface IGithubAuthor {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

export interface IGithubRelease {
  url: string;
  assets_url: string;
  upload_url: string;
  html_url: string;
  id: number;
  node_id: string;
  tag_name: string;
  target_commitish: string;
  name: string;
  draft: boolean;
  author: IGithubAuthor;
  prerelease: boolean;
  created_at: Date;
  published_at: Date;
  assets: any[];
  tarball_url: string;
  zipball_url: string;
  body: string;
}

export interface IUpdateCheckProps {
  children: React.ReactNode;
}
export interface IUpdateCheckStates {
  hasUpdate: boolean;
  text: string;
}

export default class UpdateCheck extends React.Component<IUpdateCheckProps, IUpdateCheckStates> {
  private API_URL = "https://api.github.com/repos/tbvjaos510/naver-webtoon-history/releases";

  private CURRENT_VERSION = chrome.runtime.getManifest().version;

  private fetchUpdate() {
    this.setState({ hasUpdate: true });
    axios
      .get(this.API_URL)
      .then(result => {
        console.log(result);
        const release = (result.data as Array<IGithubRelease>).find(
          value => value.tag_name === "whale-" + this.CURRENT_VERSION
        );
        if (release) {
          this.setState({ text: release.body });
        } else {
          this.setState({ text: "업데이트 정보 찾지 못했습니다." });
        }
      })
      .catch(err => {
        this.setState({ text: "목록을 불러오는 중 오류가 발생했습니다." });
      });
  }

  constructor(props) {
    super(props);

    this.state = {
      hasUpdate: false,
      text: "불러오는 중입니다..."
    };
    if (BROWSER === "whale") {
      whale.sidebarAction.getBadgeText(result => {
        if (result === " ") {
          this.fetchUpdate();
          whale.sidebarAction.setBadgeText({ text: "" });
        }
      });
    } else {
      chrome.browserAction.getBadgeText({}, result => {
        if (result === " ") {
          this.fetchUpdate();
          chrome.browserAction.setBadgeText({ text: "" });
        }
      });
    }
    window.addEventListener("extensionUpdate", () => {
      this.fetchUpdate();
    });
  }
  public render() {
    const { children } = this.props;
    return (
      <React.Fragment>
        {this.state.hasUpdate ? (
          <div
            className="uk-alert-success uk-position-absolute uk-position-z-index uk-width-expand"
            uk-alert=""
          >
            <a
              className="uk-alert-close"
              uk-close=""
              onClick={() => this.setState({ hasUpdate: false })}
            />
            <h3>{chrome.runtime.getManifest().version} 업데이트 내용</h3>
            <div style={{ fontSize: "16px" }}>
              <ReactMarkdown
                renderers={{
                  link: props => (
                    <Wlink forceTab={true} link={props.href}>
                      <a>{props.children}</a>
                    </Wlink>
                  )
                }}
                source={this.state.text}
              />
            </div>
          </div>
        ) : null}
        {children}
      </React.Fragment>
    );
  }
}
