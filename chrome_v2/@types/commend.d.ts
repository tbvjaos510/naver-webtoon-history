export interface ChromeMessage {
  command: "openTab" | "reload" | "scroll";
  scroll?: number;
}
