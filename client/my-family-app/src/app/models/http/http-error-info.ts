import { ErrorInfo } from "../error/error-info";
import { HttpErrorInfoProperties } from "./http-error-info.properties";

/**
 * HTTP Error Info class used to describe HTTP Error Information attributes.
 *
 */
export interface HttpErrorInfo extends HttpErrorInfoProperties {
  getHttpStatusCode(): number;
}
