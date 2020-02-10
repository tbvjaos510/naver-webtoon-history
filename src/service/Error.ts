import Logger from "utils/Logger";

export default class WebtoonServiceError extends Error {
  public name = "WebtoonServiceError";

  public constructor(message: string, public info?: object) {
    super(message);
    Logger.error(message, info);
  }
}
