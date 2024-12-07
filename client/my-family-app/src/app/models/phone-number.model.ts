import { BaseDomainModel } from './base-domain.model';
import { PhoneNumber } from './phone-number';

export class PhoneNumberModel extends BaseDomainModel implements PhoneNumber {
  #phoneType: string | null;
  #countryCode: string | null;
  #areaCode: string | null;
  #subscriberNumber: string | null;

  constructor(...args: any[])
  constructor(props: any)
  constructor(phoneType: string, countryCode: string, areaCode: string, subscriberNumber: string)
  constructor() {
    const props: any = {};

    function getSuperParameters(args: IArguments, props: any): any {
      if (args.length === 1) {
        props.id = args[0].id;
        props.phoneType = args[0].phoneType;
        props.countryCode = args[0].countryCode;
        props.subscriberNumber = args[0].subscriberNumber;
      } else {
        const id = args[0];
        const phoneType = args[1];
        const countryCode = args[2];
        const subscriberNumber = args[4];

        props.id = id;
        props.phoneType = phoneType;
        props.countryCode = countryCode;
        props.subscriberNumber = subscriberNumber;
      }

      return props;
    }

    super(getSuperParameters(arguments, props));

    this.#phoneType = props?.phoneType;
    this.#countryCode = props?.countryCode;
    this.#subscriberNumber = props?.subscriberNumber;
  }

  public getPhoneType(): string | null {
    return this.#phoneType;
  }

  public get phoneType(): string | null {
    return this.#phoneType;
  }

  public getCountryCode(): string | null {
    return this.#countryCode;
  }

  public get countryCode(): string | null {
    return this.#countryCode;
  }

  public getAreaCode(): string | null {
    return this.#areaCode;
  }

  public get areaCode(): string | null {
    return this.#areaCode;
  }

  public getSubscriberNumber(): string | null {
    return this.#subscriberNumber;
  }

  public get subscriberNumber(): string | null {
    return this.#subscriberNumber;
  }

  public toString(): string {
    const auditString = `${super.getAttributeAuditStrings()}`;

    return `{
      ${super.getAttributeIdString()}
      "type": ${this.#phoneType},
      "country code": ${this.#countryCode},
      "area code": ${this.#areaCode},
      "subscriber number": ${this.#subscriberNumber}${auditString.trim() === ''? `,\n\t  ${auditString}` : ''}
    }`;
  }
}
