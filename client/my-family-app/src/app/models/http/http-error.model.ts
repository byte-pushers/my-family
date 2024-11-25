import { HttpErrorInfo } from "./http-error-info";
import { HttpError } from "./http-error";

export class HttpErrorModel extends Error implements HttpError {
  #httpErrors: HttpErrorInfo[];

  constructor(errorMessage1?: String);
  constructor(error: Error, errorMessage2?: string);
  constructor(httpErrorInfoArray: HttpErrorInfo[], errorMessage3?: string);
  constructor(...args: any[]) {
    function getErrorMessage(args: any[]): string {
      let errorMessage = null;

      if (args.length === 1) {
        errorMessage = args[0] instanceof String ? (args[0] as String) : null;
      }

      if (args.length === 2) {
        errorMessage = args[1] instanceof String ? (args[1] as String) : null;
      }

      if (errorMessage == null) {
        const httpErrors = Array.isArray(args[0])
          ? (args[0] as HttpErrorInfo[])
          : [];

        httpErrors.some((httpError) => {
          if (httpError.message != null) {
            errorMessage = httpError.message;
            return true;
          }

          return false;
        });
      }

      return errorMessage;
    }

    function getErrorStackTrace(args: any[]): string {
      let stackTrace = null;

      if (args.length === 2 || args.length === 1) {
        const error = args[0] instanceof Error ? (args[0] as Error) : null;
        stackTrace = error?.stack;
      }

      return stackTrace;
    }

    function getErrorName(args: any[]): string {
      let errorName = null;

      if (args.length === 2 || args.length === 1) {
        const error = args[0] instanceof Error ? (args[0] as Error) : null;
        errorName = error?.name;
      }

      return errorName != null ? errorName : null;
    }

    function getHttpErrorInfoArray(args: any[]): HttpErrorInfo[] {
      let httpErrorInfoArray = [];

      if (args.length === 1 || args.length === 2) {
        httpErrorInfoArray = Array.isArray(args[0])
          ? (args[0] as HttpErrorInfo[])
          : [];
      }

      return httpErrorInfoArray;
    }

    super(getErrorMessage(args));

    const errorName = getErrorName(args);

    if (errorName != null) {
      this.name = errorName;
    }

    this.stack = getErrorStackTrace(args);
    this.#httpErrors = getHttpErrorInfoArray(args);
  }

  getName(): string {
    return this.name;
  }
  get name(): string {
    return this.name;
  }

  set name(name: string) {
    this.name = name;
  }

  setName(name: string) {
    this.name = name;
  }

  getMessage(): string {
    return this.message;
  }

  get message(): string {
    if (this.message == null) {
      this.getHttpErrors().some((httpError) => {
        if (httpError.message != null) {
          this.message = httpError.message;
          return true;
        }

        return false;
      });
    }

    return this.message;
  }

  set message(message: string) {
    this.message = message;
  }

  setMessage(message: string) {
    this.message = message;
  }

  getStack(): string {
    return this.stack;
  }

  get stack(): string {
    return this.stack;
  }

  set stack(stack: string) {
    this.stack = stack;
  }

  setStack(stack: string) {
    this.stack = stack;
  }

  getHttpErrors(): HttpErrorInfo[] {
    return this.#httpErrors;
  }
  get httpErrors(): HttpErrorInfo[] {
    return this.#httpErrors;
  }

  set httpErrors(httpErrors: HttpErrorInfo[]) {
    this.#httpErrors = httpErrors;
  }

  setHttpErrors(httpErrors: HttpErrorInfo[]) {
    this.#httpErrors = httpErrors;
  }
}
