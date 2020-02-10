export default class Logger {
  public static log(message: string, params?: {}) {
    if (ENV === "development") {
      if (params !== undefined) {
        console.log(message, params);
      } else {
        console.log(message);
      }
    }
  }

  public static warn(message: string, params?: {}) {
    if (ENV === "development") {
      if (params !== undefined) {
        console.warn(message, params);
      } else {
        console.warn(message);
      }
    }
  }

  public static error(message: string, params?: {}) {
    if (ENV === "development") {
      if (params !== undefined) {
        console.error(message, params);
      } else {
        console.error(message);
      }
    }
  }
}
