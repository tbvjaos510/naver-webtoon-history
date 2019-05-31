declare module NodeJS {
  interface Global {
    chrome: typeof SinonChrome;
    whale: typeof whale | any;
    BROWSER: typeof BROWSER;
  }
}
