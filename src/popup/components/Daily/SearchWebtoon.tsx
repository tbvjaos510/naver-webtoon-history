import * as React from "react";

export interface ISearchWebtoonProps {
  hidden: boolean;
  changeKeyword: (keyword: string) => void;
  toggleSearch: () => void;
  keyword: string;
}

export default class SearchWebtoon extends React.Component<ISearchWebtoonProps, any> {
  public render() {
    const { hidden, changeKeyword, toggleSearch, keyword } = this.props;
    return (
      <div className="search-box uk-flex uk-flex-1 " hidden={hidden}>
        <div className="uk-width-expand">
          <form className="uk-search uk-width-1-1">
            <input
              className="uk-input"
              type="search"
              style={{
                border: 0
              }}
              value={keyword || ""}
              placeholder="웹툰 검색..."
              onChange={e => changeKeyword(e.target.value)}
            />
          </form>
        </div>

        <a className="uk-flex" uk-close="" onClick={() => toggleSearch()} href="#" />
      </div>
    );
  }
}
