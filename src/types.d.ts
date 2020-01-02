declare const BROWSER: "whale" | "chrome";
declare const ENV: "production" | "development";

declare module "uikit" {
  const UIKit: UIkit;
  export default UIkit;
}

declare const i18n: typeof import("static/_locales/ko/messages.json");
