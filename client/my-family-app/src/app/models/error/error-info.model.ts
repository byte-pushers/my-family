import { ErrorInfo } from "./error-info";
import { ErrorInfoProperties } from "./error-info.properties";

export class ErrorInfoModel implements ErrorInfo {
  #code: string;
  #field: { name: string; min?: number; max?: number; required?: boolean };
  #message: string;
  #type: string;

  constructor(config: ErrorInfoProperties) {
    this.#code = config?.code;
    this.#field = config?.field;
    this.#message = config?.message;
    this.#type = config?.type;
  }

  getCode(): string {
    return this.#code;
  }

  get code(): string {
    return this.#code;
  }

  getField(): { name: string; min?: number; max?: number; required?: boolean } {
    return this.#field;
  }

  get field(): {
    name: string;
    min?: number;
    max?: number;
    required?: boolean;
  } {
    return this.#field;
  }

  getMessage(): string {
    return this.#message;
  }
  get message(): string {
    return this.#message;
  }

  getType(): string {
    return this.#type;
  }

  get type(): string {
    return this.#type;
  }
}
