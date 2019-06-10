declare module NodeJS {
  interface Global {
    onerror: Function;
    chrome: typeof SinonChrome;
    whale: typeof whale | any;
    BROWSER: typeof BROWSER;
  }
}
