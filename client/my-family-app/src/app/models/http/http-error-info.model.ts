import { HttpErrorInfo } from "./http-error-info";
import { HttpErrorInfoProperties } from "./http-error-info.properties";
import { HttpErrorModel } from "./http-error.model";
import { ErrorInfoModel } from "../error/error-info.model";

export class HttpErrorInfoModel
  extends ErrorInfoModel
  implements HttpErrorInfo
{
  #httpStatusCode: number;

  constructor(config: HttpErrorInfoProperties) {
    super(config);
    this.#httpStatusCode = config?.httpStatusCode;
  }

  getHttpStatusCode(): number {
    return this.#httpStatusCode;
  }

  get httpStatusCode(): number {
    return this.#httpStatusCode;
  }
}
