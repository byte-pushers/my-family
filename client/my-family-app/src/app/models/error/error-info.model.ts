import { ErrorInfo } from "./error-info";
import { ErrorInfoProperties } from "./error-info.properties";

export class ErrorInfoModel implements ErrorInfo {
  #code?: string;
  #field?: { name: string; min?: number; max?: number; required?: boolean };
  #message?: string;
  #type?: string;

  constructor(config: ErrorInfoProperties) {
    this.#code = config?.code;
    this.#field = config?.field;
    this.#message = config?.message;
    this.#type = config?.type;
  }

  getCode(): string | undefined {
    return this.#code;
  }

  get code(): string | undefined {
    return this.#code;
  }

  getField(): { name: string; min?: number; max?: number; required?: boolean } | undefined {
    return this.#field;
  }

  get field(): {
    name: string;
    min?: number;
    max?: number;
    required?: boolean;
  } | undefined {
    return this.#field;
  }

  getMessage(): string | undefined {
    return this.#message;
  }
  get message(): string | undefined {
    return this.#message;
  }

  getType(): string | undefined {
    return this.#type;
  }

  get type(): string | undefined {
    return this.#type;
  }
}
