import {
  removeContext,
  addLinkContext,
  CONTEXT_MENU_ID_TAB,
  addContextClickListener,
  CONTEXT_MENU_ID_SIDEBAR,
  CONTEXT_MENU_ID_FAVORATE
} from ".";
import mockWhale from "../../__mocks__/whale";
import * as sinonChrome from "sinon-chrome";
import WebtoonStore from "../../store/webtoon";
import Link from "../link";

jest.mock("../link");

const webtoonUrl = "https://comic.naver.com/webtoon/list.nhn?titleId=";

describe("tools/contextMenu", () => {
  beforeAll(() => {
    global.chrome = sinonChrome;
  });

  afterAll(() => {
    sinonChrome.flush();
    delete global.chrome;
  });

  it("removeContext() callback works", () => {
    const callback = jest.fn();
    removeContext(callback);
    expect(callback).not.toBeCalled();
    sinonChrome.contextMenus.removeAll.yield();
    // removeAll 콜백 실행되게 함
    expect(callback).toBeCalled();
  });

  describe("addLinkContext() create contextMenu when", () => {
    afterEach(() => {
      sinonChrome.contextMenus.removeAll.flush();
      sinonChrome.contextMenus.create.flush();
    });

    it("browser is whale", () => {
      global.BROWSER = "whale";
      addLinkContext();
      // removeAll 콜백 실행되게 함
      sinonChrome.contextMenus.removeAll.yield();

      // context가 3개 추가돼야함.
      expect(sinonChrome.contextMenus.create.callCount).toBe(3);
      expect(sinonChrome.contextMenus.create.getCall(0).args[0].id).toBe(CONTEXT_MENU_ID_TAB);
      expect(sinonChrome.contextMenus.create.getCall(1).args[0].id).toBe(CONTEXT_MENU_ID_FAVORATE);
      expect(sinonChrome.contextMenus.create.getCall(2).args[0].id).toBe(CONTEXT_MENU_ID_SIDEBAR);
      delete global.BROWSER;
    });

    it("browser is chrome", () => {
      global.BROWSER = "chrome";
      addLinkContext();
      // removeAll 콜백 실행되게 함
      sinonChrome.contextMenus.removeAll.yield();

      // context가 2개 추가돼야함.
      expect(sinonChrome.contextMenus.create.callCount).toBe(2);
      expect(sinonChrome.contextMenus.create.getCall(0).args[0].id).toBe(CONTEXT_MENU_ID_TAB);
      expect(sinonChrome.contextMenus.create.getCall(1).args[0].id).toBe(CONTEXT_MENU_ID_FAVORATE);
      delete global.BROWSER;
    });
  });

  describe("addContextClickListener() event work when", () => {
    let webtoonStore: WebtoonStore;
    beforeAll(() => {
      webtoonStore = { starWebtoons: [] } as WebtoonStore;
      addContextClickListener(webtoonStore);
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
      sinonChrome.contextMenus.onClicked.trigger({
        menuItemId: CONTEXT_MENU_ID_SIDEBAR,
        linkUrl: webtoonUrl
      } as chrome.contextMenus.OnClickData);

      expect(Link.openSidebar).toBeCalled();
    });

    it("menuItemId is CONTEXT_MENU_ID_TAB", () => {
      sinonChrome.contextMenus.onClicked.trigger({
        menuItemId: CONTEXT_MENU_ID_TAB,
        linkUrl: webtoonUrl
      } as chrome.contextMenus.OnClickData);
      expect(Link.openPopup).toBeCalled();
    });

    describe("menuItemId is CONTEXT_MENU_ID_FAVORATE and webtoonId is ", () => {
      beforeAll(() => {
        webtoonStore.starWebtoons.push(12345);
      });

      afterEach(() => {
        sinonChrome.tabs.executeScript.flush();
      });

      it("exists in favorate", () => {
        sinonChrome.contextMenus.onClicked.trigger({
          menuItemId: CONTEXT_MENU_ID_FAVORATE,
          linkUrl: webtoonUrl + "12345",
          frameId: 1
        } as chrome.contextMenus.OnClickData);
        expect(sinonChrome.tabs.executeScript.getCall(0).args[0].code).toBe(
          `alert("[Naver Webtoon Extention] 이미 즐겨찾기에 존재합니다.");`
        );
      });

      it("not exists in favorate", () => {
        sinonChrome.contextMenus.onClicked.trigger({
          menuItemId: CONTEXT_MENU_ID_FAVORATE,
          linkUrl: webtoonUrl + "11111",
          frameId: 1
        } as chrome.contextMenus.OnClickData);
        expect(sinonChrome.tabs.executeScript.getCall(0).args[0].code).toBe(
          `alert("[Naver Webtoon Extention] 즐겨찾기에 추가하였습니다.");`
        );
        // add to store test
        expect(webtoonStore.starWebtoons.indexOf(11111)).not.toBe(-1);
      });
    });
  });
});
