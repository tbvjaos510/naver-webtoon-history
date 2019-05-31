import {
  removeContext,
  addLinkContext,
  CONTEXT_MENU_ID_TAB,
  addContextClickListener,
  CONTEXT_MENU_ID_SIDEBAR,
  CONTEXT_MENU_ID_FAVORATE
} from "../../src/tools/contextMenu";
import mockWhale from "../whale";
import * as sinonChorme from "sinon-chrome";
import { getWebtoonStore } from "../store/storeTestHelper";

const webtoonUrl = "https://comic.naver.com/webtoon/list.nhn?titleId=12345";
const mobileUrl = "https://m.comic.naver.com/webtoon/list.nhn?titleId=12345";

describe("tools/contextMenu", () => {
  beforeAll(() => {
    global.chrome = sinonChorme;
  });

  afterAll(() => {
    sinonChorme.flush();
    delete global.chrome;
  });

  it("removeContext() callback works", () => {
    const callback = jest.fn();
    removeContext(callback);
    expect(callback).not.toBeCalled();
    sinonChorme.contextMenus.removeAll.yield();
    // removeAll 콜백 실행되게 함
    expect(callback).toBeCalled();
  });

  describe("addLinkContext() create contextMenu when", () => {
    afterEach(() => {
      sinonChorme.contextMenus.removeAll.flush();
      sinonChorme.contextMenus.create.flush();
    });

    it("browser is whale", () => {
      global.BROWSER = "whale";
      addLinkContext();
      // removeAll 콜백 실행되게 함
      sinonChorme.contextMenus.removeAll.yield();

      // context가 3개 추가돼야함.
      expect(sinonChorme.contextMenus.create.callCount).toBe(3);
      expect(sinonChorme.contextMenus.create.getCall(0).args[0].id).toBe(CONTEXT_MENU_ID_TAB);
      expect(sinonChorme.contextMenus.create.getCall(1).args[0].id).toBe(CONTEXT_MENU_ID_FAVORATE);
      expect(sinonChorme.contextMenus.create.getCall(2).args[0].id).toBe(CONTEXT_MENU_ID_SIDEBAR);
      delete global.BROWSER;
    });

    it("browser is chrome", () => {
      global.BROWSER = "chrome";
      addLinkContext();
      // removeAll 콜백 실행되게 함
      sinonChorme.contextMenus.removeAll.yield();

      // context가 2개 추가돼야함.
      expect(sinonChorme.contextMenus.create.callCount).toBe(2);
      expect(sinonChorme.contextMenus.create.getCall(0).args[0].id).toBe(CONTEXT_MENU_ID_TAB);
      expect(sinonChorme.contextMenus.create.getCall(1).args[0].id).toBe(CONTEXT_MENU_ID_FAVORATE);
      delete global.BROWSER;
    });
  });

  describe("addContextClickListener() event work when", () => {
    beforeAll(() => {
      global.BROWSER = "whale";
      // whale BrowserAction
      global.whale = mockWhale;
    });

    afterAll(() => {
      delete global.BROWSER;
      delete global.whale;
    });

    it("menuItemId is CONTEXT_MENU_ID_SIDEBAR", () => {
      // webtoon store가 필요하지 않음
      addContextClickListener(null);
      sinonChorme.contextMenus.onClicked.trigger({
        menuItemId: CONTEXT_MENU_ID_SIDEBAR,
        linkUrl: webtoonUrl
      } as chrome.contextMenus.OnClickData);

      expect(mockWhale.sidebarAction.show).toBeCalled();
    });

    it("menuItemId is CONTEXT_MENU_ID_TAB", () => {
      addContextClickListener(null);
      sinonChorme.contextMenus.onClicked.trigger({
        menuItemId: CONTEXT_MENU_ID_TAB,
        linkUrl: webtoonUrl
      } as chrome.contextMenus.OnClickData);

      expect(sinonChorme.windows.create).toBeCalled();
    });

    it("menuItemId is CONTEXT_MENU_ID_FAVORATE", () => {});
  });
});
