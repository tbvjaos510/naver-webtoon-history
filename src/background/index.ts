import RootStore from "../store";
import history from "./tab/history";
import onInstall from "./runtime/onInstall";
import onMessage from "./runtime/onMessage";
import { addContextClickListener, addLinkContext } from "../tools/contextMenu";

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
