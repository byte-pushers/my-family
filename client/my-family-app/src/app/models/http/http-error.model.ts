import { HttpErrorInfo } from './http-error-info';
import { HttpError } from './http-error';

export class HttpErrorModel extends Error implements HttpError {
  #httpErrors: HttpErrorInfo[];

  constructor(errorMessage1?: string);
  constructor(error: Error, errorMessage2?: string);
  constructor(httpErrorInfoArray: HttpErrorInfo[], errorMessage3?: string);
  constructor(...args: any[]) {
    function getErrorMessage(args: any[]): string {
      let errorMessage = null;

      if (args.length === 1) {
        errorMessage = args[0] instanceof String ? (args[0] as string) : null;
      }

      if (args.length === 2) {
        errorMessage = args[1] instanceof String ? (args[1] as string) : null;
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

      return errorMessage != null? errorMessage : '';
    }

    function getErrorStackTrace(args: any[]): string {
      let stackTrace = null;

      if (args.length === 2 || args.length === 1) {
        const error = args[0] instanceof Error ? (args[0] as Error) : null;
        stackTrace = error?.stack;
      }

      return stackTrace != null? stackTrace : '';
    }

    function getErrorName(args: any[]): string | null {
      let errorName = null;

      if (args.length === 2 || args.length === 1) {
        const error = args[0] instanceof Error ? (args[0] as Error) : null;
        errorName = error?.name;
      }

      return errorName != null ? errorName : null;
    }

    function getHttpErrorInfoArray(args: any[]): HttpErrorInfo[] {
      let httpErrorInfoArray: HttpErrorInfo[] = [];

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
      super.name = errorName;
    }

    super.stack = getErrorStackTrace(args);
    this.#httpErrors = getHttpErrorInfoArray(args);
  }

  getName(): string {
    return super.name;
  }

  setName(name: string) {
    super.name = name;
  }

  getMessage(): string {
    return super.message;
  }

  override get message(): string {
    let message = super.message;

    if (message == null) {
      this.getHttpErrors().some((httpError) => {
        if (httpError.message != null) {
          message = httpError.message;
          return true;
        }

        return false;
      });
    }

    return message;
  }

  setMessage(message: string) {
    super.message = message;
  }

  getStack(): string | undefined {
    return super.stack;
  }

  setStack(stack: string) {
    super.stack = stack;
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
