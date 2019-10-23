import '../analytics';

import RootStore from '../store';
import { addContextClickListener, addLinkContext } from '../tools/contextMenu';
import onInstall from './runtime/onInstall';
import onMessage from './runtime/onMessage';
import history from './tab/history';

const store = new RootStore(true, () => {
  history(store.webtoon, store.option);
  onMessage(store.webtoon, store.option);
  if (chrome["contextMenus"]) {
    // contextMenu권한이 있을 때
    addContextClickListener(store.webtoon);
  }
  if (store.option.useContextMenu) {
    addLinkContext();
  }
});

onInstall(store.webtoon, store.option);

// analytics
if (BROWSER === "whale") {
  whale.sidebarAction.onClicked.addListener(() => {
    ga("send", "event", "extension", "whale-sidebar-clicked");
  });
}
