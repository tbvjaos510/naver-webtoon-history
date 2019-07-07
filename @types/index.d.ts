declare module NodeJS {
  interface Global {
    dispatchEvent: jest.Mock<any, any>;
    onerror: Function;
    chrome: typeof SinonChrome;
    whale: typeof whale | any;
    BROWSER: typeof BROWSER;
    ENV: typeof ENV;
  }
}
