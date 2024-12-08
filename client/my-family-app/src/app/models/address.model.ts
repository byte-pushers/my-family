import { BaseDomainModel } from './base-domain.model';
import { Address } from './address';

export class AddressModel extends BaseDomainModel implements Address {
  #addressLine1: string;
  #addressLine2: string;
  #city: string;
  #state: string;
  #zipcode: string;

  constructor(...args: any[])
  constructor(props: any)
  constructor(addressLine1: string, addressLine2: string, city: string, state: string, zipcode: string)
  constructor() {
    const props: any = {};

    function getSuperParameters(args: IArguments, props: any): any {
      if (args.length === 1) {
        props.id = args[0].id;
        props.addressLine1 = args[0].addressLine1;
        props.addressLine2 = args[0].addressLine2;
        props.city = args[0].city;
        props.state = args[0].state;
        props.zipcode = args[0].zipcode;
      } else {
        const id = args[0];
        const addressLine1 = args[1];
        const addressLine2 = args[2];
        const city = args[4];
        const state = args[5];
        const zipcode = args[6];

        props.id = id;
        props.addressLine1 = addressLine1;
        props.addressLine2 = addressLine2;
        props.city = city;
        props.state = state;
        props.zipcode = zipcode;
      }

      return props;
    }

    super(getSuperParameters(arguments, props));

    this.#addressLine1 = props?.addressLine1;
    this.#addressLine2 = props?.addressLine2;
    this.#city = props?.city;
    this.#state = props?.state;
    this.#zipcode = props?.zipcode;
  }

  public getAddressLine1(): string {
    return this.#addressLine1;
  }

  public get addressLine1(): string {
    return this.#addressLine1;
  }

  public getAddressLine2(): string {
    return this.#addressLine2;
  }

  public get addressLine2(): string {
    return this.#addressLine2;
  }

  public getCity(): string {
    return this.#city;
  }

  public get city(): string {
    return this.#city;
  }

  public getState(): string {
    return this.#state;
  }

  public get state(): string {
    return this.#state;
  }

  public getZipcode(): string {
    return this.#zipcode;
  }

  public get zipcode(): string {
    return this.#zipcode;
  }

  public override toString(): string {
    const auditString = `${super.getAttributeAuditStrings()}`;
    return `{
      ${super.getAttributeIdString()}
      "address line1": ${this.#addressLine1},
      "address line2": ${this.#addressLine2},
      "city": ${this.#city},
      "state": ${this.#state},
      "zipcode": ${this.#zipcode}${auditString.trim() === ''? `,\n\t  ${auditString}` : ''}
    }`;
  }
}
