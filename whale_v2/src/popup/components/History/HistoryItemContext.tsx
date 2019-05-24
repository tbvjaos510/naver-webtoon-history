/**
 * 사용 보류.
 */

import * as React from "react";
import { Menu, Item } from "react-contexify";
import WebtoonStore, { RecentWebtoon } from "../../../store/webtoon";
import { inject, observer } from "mobx-react";
import { MenuItemEventHandler } from "react-contexify/lib/types";

export interface IHistoryItemContextProps {
  menuId: string;
  webtoon?: WebtoonStore;
}

@inject("webtoon")
@observer
export default class HistoryItemContext extends React.Component<IHistoryItemContextProps, any> {
  private removeHistory({ event, props }: MenuItemEventHandler) {
    const { webtoon } = this.props;
    const info: RecentWebtoon = props["webtoon"];
    delete webtoon.visits[info.id][info.no];
    if (Object.keys(webtoon.visits[info.id]).length === 0) {
      delete webtoon.visits[info.id];
      delete webtoon.webtoonType[info.id];
      webtoon.webtoonType = webtoon.webtoonType;
    }
    webtoon.visits = webtoon.visits;
  }

  public render() {
    const { menuId, webtoon } = this.props;
    console.log("rendered!");
    return (
      <Menu id={menuId}>
        <Item onClick={e => this.removeHistory(e)} disabled={false}>
          기록 삭제
        </Item>
      </Menu>
    );
  }
}
