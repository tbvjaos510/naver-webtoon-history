import { LinkTarget } from "../interface";

export default function openLink(url: string, target: LinkTarget) {
  switch (target) {
    case LinkTarget.TAB:
      return chrome.tabs.create({ url });
    case LinkTarget.CURRENT:
      return chrome.tabs.update({ url });
    case LinkTarget.MOBILE:
      return chrome.windows.create({ url, type: "mobile" });
    case LinkTarget.SIDEBAR:
      return whale.sidebarAction.setPage({ page: url });
    default:
      return chrome.tabs.create({ url });
  }
}
