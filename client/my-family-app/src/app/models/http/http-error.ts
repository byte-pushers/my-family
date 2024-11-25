import { HttpErrorInfo } from "./http-error-info";
import { HttpErrorProperties } from "./http-error.properties";

export interface HttpError extends HttpErrorProperties {
  getName(): string;
  setName(name: string): void;
  getStack(): string;
  setStack(stackTrace: string): void;
  getMessage(): string;
  setMessage(message: string): void;
  getHttpErrors(): HttpErrorInfo[];
  setHttpErrors(httpErrors: HttpErrorInfo[]): void;
}
