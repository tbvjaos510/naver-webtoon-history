import RootStore from "../store";
import history from "./tab/history";
import onInstall from "./runtime/onInstall";
import onMessage from "./runtime/onMessage";

const store = new RootStore(true, () => {
  history(store.webtoon, store.option);
  onMessage(store.webtoon, store.option);
  // contextMenu(store.webtoon, store.option);
});
onInstall(store.webtoon, store.option);
