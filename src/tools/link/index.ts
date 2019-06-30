import { LinkTarget } from "../../store/option";

export default {
  openUrl(linkTarget: LinkTarget, link: string) {
    switch (linkTarget) {
      case "Current":
        this.openCurrentTab(link);
        break;
      case "Popup":
        this.openPopup(link);
        break;
      case "Tab":
        this.openNewTab(link);
        break;
      case "Sidebar":
        this.openSidebar(link);
        break;
      case "Mobile":
        this.openMobile(link);
        break;
    }
  },
  openMobile(link: string) {
    chrome.windows.create({
      url: link.replace("https://", "https://m."),
      width: 400,
      height: 800,
      type: "mobile"
    });
  },
  openCurrentTab(link: string) {
    chrome.tabs.update({
      url: link
    });
  },
  openNewTab(link: string) {
    chrome.tabs.create({
      url: link
    });
  },
  openPopup(link: string) {
    chrome.windows.create({
      url: link.replace("https://", "https://m."),
      width: 400,
      height: 800,
      type: "popup"
    });
  },
  openSidebar(link: string) {
    if (BROWSER === "chrome") return;
    whale.sidebarAction.show({
      reload: true,
      url: link.replace("https://", "https://m.")
    });
  }
};
