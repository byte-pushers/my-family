import { ErrorInfoProperties } from "../error/error-info.properties";

export interface HttpErrorInfoProperties extends ErrorInfoProperties {
  httpStatusCode: number;
}
