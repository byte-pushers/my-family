import { BaseModel } from './base.model';

export abstract class BaseDomainModel implements BaseModel {
  #id?: number | null;
  #createdBy?: string | null;
  #createdDate?: Date | null;
  #updatedBy?: string | null;
  #updatedDate?: Date | null;

  protected constructor(props: { id?: number, createdBy?: string, createdDate?: Date, updatedBy?: string, updatedDate?: Date }) {
    this.#id = props?.id;
    this.#createdBy = props?.createdBy;
    this.#createdDate = props?.createdDate;
    this.#updatedBy = props?.updatedBy;
    this.#updatedDate = props?.updatedDate;
  }

  public getId(): number | undefined | null {
    return this.#id;
  }

  public get id(): number | undefined | null {
    return this.#id;
  }

  public getCreatedBy(): string | undefined | null {
    return this.#createdBy;
  }

  public get createdBy(): string | undefined | null {
    return this.#createdBy;
  }

  public getCreatedDate(): Date | undefined | null {
    return this.#createdDate;
  }

  public get createdDate(): Date | undefined | null {
    return this.#createdDate;
  }

  public getUpdatedBy(): string | undefined | null {
    return this.#updatedBy;
  }

  public get updatedBy(): string | undefined | null {
    return this.#updatedBy;
  }

  public getUpdatedDate(): Date | undefined | null {
    return this.#updatedDate;
  }

  public get updatedDate(): Date | undefined | null {
    return this.#updatedDate;
  }

  public getAttributeString(criteria: { id?: number | null, createdBy?: string | null, createdDate?: Date | null, updatedBy?: string | null, updatedDate?: Date | null }): string {
    let s = '';

    if (criteria == null || criteria?.id) s += `"id": ${this.#id}, `;
    if (criteria == null || criteria?.createdBy) s += `"createdBy": ${this.#createdBy}, `;
    if (criteria == null || criteria?.createdDate) s += `"createdDate": ${this.#createdDate?.toISOString()}, `;
    if (criteria == null || criteria?.updatedBy) s += `"updatedBy": ${this.#updatedBy}, `;
    if (criteria == null || criteria?.updatedDate) s += `"updatedDate": ${this.#updatedDate?.toISOString()}, `;

    return s;
  }

  public getAttributeIdString(criteria: { id?: number | null } = {id: this.id}): string {
    return this.getAttributeString(criteria);
  }

  public getAttributeAuditStrings(criteria: { id?: number, createdBy?: string | null, createdDate?: Date | null, updatedBy?: string | null, updatedDate?: Date | null } = {createdBy: this.createdBy, createdDate: this.createdDate, updatedBy: this.updatedBy, updatedDate: this.updatedDate}): string {
    return this.getAttributeString(criteria);
  }
}
