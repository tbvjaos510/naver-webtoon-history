declare const BROWSER: "whale" | "chrome";
declare const ENV: "production" | "development";

declare module "uikit" {
  const UIKit: UIkit;
  export default UIkit;
}

type I18N = typeof import("static/_locales/ko/messages.json");
declare type I18N_KEY = keyof I18N;
