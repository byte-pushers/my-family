import { BaseDomain } from './base-domain';

export abstract class BaseDomainModel implements BaseDomain {
  #id?: any; // string | number | null;
  #createdBy?: string | null;
  #createdDate?: Date | null;
  #updatedBy?: string | null;
  #updatedDate?: Date | null;

  protected constructor(props: { id?: number, createdBy?: string, createdDate?: Date, updatedBy?: string, updatedDate?: Date }) {
    this.#id = props?.id;
    this.#createdBy = props?.createdBy;
    this.#createdDate = props?.createdDate? new Date(props.createdDate): null;
    this.#updatedBy = props?.updatedBy;
    this.#updatedDate = props?.updatedDate? new Date(props.updatedDate): null;
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

  public getAttributeString(criteria: { id?: string | number | null, createdBy?: string | null, createdDate?: Date | null, updatedBy?: string | null, updatedDate?: Date | null } | null): string {
    const attributeArray = [];

    if (criteria && criteria.id !== undefined && this.#id !== undefined) {
      if (typeof this.#id === 'string' || this.#id instanceof String) {
        attributeArray.push(`"id": "${this.#id}",`);
      } else {
        attributeArray.push(`"id": ${this.#id},`);
      }
    }
    if (criteria && criteria.createdBy !== undefined && this.#createdBy !== undefined) {
      attributeArray.push(`"createdBy": "${this.#createdBy}"`);
    }
    if (criteria && criteria.createdDate !== undefined && this.#createdDate !== undefined) {
      attributeArray.push(`"createdDate": "${this.#createdDate?.toISOString()}"`);
    }
    if (criteria && criteria.updatedBy !== undefined && this.#updatedBy !== undefined) {
      attributeArray.push(`"updatedBy": "${this.#updatedBy}"`);
    }
    if (criteria && criteria.updatedDate !== undefined && this.#updatedDate !== undefined) {
      attributeArray.push(`"updatedDate": "${this.#updatedDate?.toISOString()}"`);
    }

    return attributeArray.reduce((result, attribute, attributeIndex, attributeArray) => {
      if (attributeIndex < attributeArray.length - 1 ) {
        result += attribute;
      } else if (attributeArray.length == 1) {
        result += attribute.startsWith("id")? attribute + ',' : attribute;
      } else {
        result += attribute
      }

      return result;
    }, '');
  }

  public getAttributeIdString(criteria: { id?: number | null } = {id: null}): string {
    return this.getAttributeString(criteria);
  }

  public getAttributeAuditStrings(criteria: { id?: number, createdBy?: string | null, createdDate?: Date | null, updatedBy?: string | null, updatedDate?: Date | null } = {createdBy: null, createdDate: null, updatedBy: null, updatedDate: null}): string {
    return this.getAttributeString(criteria);
  }
}
