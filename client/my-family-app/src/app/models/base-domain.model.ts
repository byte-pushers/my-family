import { BaseModel } from './base.model';

export abstract class BaseDomainModel implements BaseModel {
  #id?: number;
  #createdBy?: string;
  #createdDate?: Date;
  #updatedBy?: string;
  #updatedDate?: Date;

  constructor(id?: number, createdBy?: string, createdDate?: Date, updatedBy?: string, updatedDate?: Date) {
    this.#id = id;
    this.#createdBy = createdBy;
    this.#createdDate = createdDate;
    this.#updatedBy = updatedBy;
    this.#updatedDate = updatedDate;
  }

  public getId(): number | undefined {
    return this.#id;
  }

  public get id(): number | undefined {
    return this.#id;
  }

  public getCreatedBy(): string | undefined {
    return this.#createdBy;
  }

  public get createdBy(): string | undefined {
    return this.#createdBy;
  }

  public getCreatedDate(): Date | undefined {
    return this.#createdDate;
  }

  public get createdDate(): Date | undefined {
    return this.#createdDate;
  }

  public getUpdatedBy(): string | undefined {
    return this.#updatedBy;
  }

  public get updatedBy(): string | undefined {
    return this.#updatedBy;
  }

  public getUpdatedDate(): Date | undefined {
    return this.#updatedDate;
  }

  public get updatedDate(): Date | undefined {
    return this.#updatedDate;
  }

  public toString(): string {
    return `{
      "id": ${this.#id},
      ${this.getPartialJSON()},
      "createdBy": "${this.#createdBy}",
      "updatedBy": "${this.#updatedBy}",
      "createdDate": "${this.#createdDate}",
      "updatedDate": "${this.#updatedDate}"
    }`;
  }

  public abstract getPartialJSON(): string;
}
