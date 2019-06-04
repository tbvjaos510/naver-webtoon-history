import * as sinonChrome from "sinon-chrome";

jest.mock("../background/tab/utility");

describe("contentScript", () => {
  beforeAll(() => {
    global.chrome = sinonChrome;
  });

  afterAll(() => {
    sinonChrome.flush();
    delete global.chrome;
  });

  afterEach(() => {
    sinonChrome.storage.sync.get.flush();
    sinonChrome.runtime.sendMessage.flush();
  });

  it("addTabButton() and openTab() work", () => {
    // not contain params titleId
    delete window.location;
    window.location = { href: "http://www.test.com" } as any;
    sinonChrome.storage.sync.get.withArgs("option").yields({ option: "{}" });

    require(".");

    expect(document.getElementById("layer-link")).toBeTruthy();
    document.getElementById("layer-link").click();
    expect(sinonChrome.runtime.sendMessage.called).toBe(true);
  });

  describe("url contains detail.nhn when", () => {
    it("no is null", () => {
      delete window.location;
      window.location = { href: "https://www.test.com/detail.nhn?titleId=123" } as any;
      sinonChrome.storage.sync.get
        .withArgs("option")
        .yields({ option: JSON.stringify({ _storeLocation: "local" }) });

      require(".");

      expect(sinonChrome.storage.local.set.called).toBe(false);
    });

    describe("scroll data", () => {
      beforeAll(() => {
        location.href = "https://www.test.com/detail.nhn?titleId=123&no=10";
      });
      it("is exists", () => {});
    });
  });
});
