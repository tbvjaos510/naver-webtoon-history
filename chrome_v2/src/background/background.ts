import RootStore from "../popup/store";
import history from "./tab/history";
import onInstall from "./runtime/onInstall";
import onMessage from "./runtime/onMessage";

const store = new RootStore();

history(store.webtoon, store.option);
onInstall(store.webtoon, store.option);
onMessage(store.webtoon, store.option);
