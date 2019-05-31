import Link from "../../src/tools/link";
import * as sinonChrome from "sinon-chrome";
import mockWhale from "../whale";

describe("tools/link", () => {
  const testURL = "https://comic.naver.com";
  const testMobileURL = "https://m.comic.naver.com";

  beforeAll(() => {
    global.chrome = sinonChrome;
    global.whale = mockWhale;
  });

  afterAll(() => {
    sinonChrome.flush();
    delete global.chrome;
    delete global.whale;
  });

  it("openCurrentTab() work", () => {
    Link.openCurrentTab(testURL);
    expect(sinonChrome.tabs.update.calledWith({ url: testURL })).toBe(true);
    sinonChrome.tabs.update.flush();
  });

  it("openNewTab() work", () => {
    Link.openNewTab(testURL);
    expect(sinonChrome.tabs.create.calledWith({ url: testURL })).toBe(true);
    sinonChrome.tabs.create.flush();
  });

  it("openPopup() work", () => {
    Link.openPopup(testURL);
    expect(sinonChrome.windows.create.args[0][0].url).toBe(testMobileURL);
    expect(sinonChrome.windows.create.args[0][0].type).toBe("popup");
    sinonChrome.windows.create.flush();
  });

  describe("openSidebar() work when", () => {
    it("BROWSER is chrome", () => {
      global.BROWSER = "chrome";
      Link.openSidebar(testURL);
      expect(mockWhale.sidebarAction.show).not.toBeCalled();
      delete global.BROWSER;
    });
    it("BROWSER is whale", () => {
      global.BROWSER = "whale";
      Link.openSidebar(testURL);
      expect(mockWhale.sidebarAction.show).toBeCalledWith({
        reload: true,
        url: testMobileURL
      });
      delete global.BROWSER;
    });
  });
});
