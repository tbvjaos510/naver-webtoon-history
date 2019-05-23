import { LinkTarget } from "../../store/option";

export default class Link {
  public static openUrl(linkTarget: LinkTarget, link: string) {
    switch (linkTarget) {
      case "Current":
        Link.openCurrentTab(link);
        break;
      case "Popup":
        Link.openPopup(link);
        break;
      case "Tab":
        Link.openNewTab(link);
        break;
      case "Sidebar":
        Link.openSidebar(link);
        break;
    }
  }

  public static openCurrentTab(link: string) {
    whale.tabs.update({
      url: link
    });
  }

  public static openNewTab(link: string) {
    whale.tabs.create({
      url: link
    });
  }

  public static openPopup(link: string) {
    whale.windows.create({
      url: link.replace("https://", "https://m."),
      width: 400,
      height: 800,
      type: "popup"
    });
  }

  public static openSidebar(link: string) {
    whale.sidebarAction.show({
      reload: true,
      url: link.replace("https://", "https://m.")
    });
  }
}
