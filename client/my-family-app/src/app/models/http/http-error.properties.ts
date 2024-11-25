import { HttpErrorInfo } from "./http-error-info";

export interface HttpErrorProperties {
  name: string;
  stack: string;
  message: string;
  httpErrors: HttpErrorInfo[];
}
