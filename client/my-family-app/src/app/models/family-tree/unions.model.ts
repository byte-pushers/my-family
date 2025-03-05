import { BaseDomainModel } from '../base-domain.model';
import { Unions } from "./unions";
import { Person } from "./person";

export class UnionsModel extends BaseDomainModel implements Unions {
  readonly #married: boolean;
  readonly #spouse: Person | null;
  readonly #children: Person[] | null;

  constructor(...args: any[])
  constructor(props: any)
  constructor(
    id: number,
    married: boolean,
    spouse: Person,
    children: Person[] | null
  )
  constructor() {
    const props: any = {};

    function getSuperParameters(args: IArguments, props: any): any {
      if (args.length === 1) {
        props.id = args[0].id;
        props.married = args[0].married;
        props.spouse = args[0].spouse; // new PersonModel(
        props.children = args[0].children
        props.createdBy = args[0].createdBy;
        props.createdDate = args[0].createdDate;
        props.updatedBy = args[0].updatedBy;
        props.updatedDate = args[0].updatedDate;
      } else {
        const id = args[0];
        const married = args[1];
        const spouse = args[2];
        const children = args[3];

        props.id = id;
        props.married = married;
        props.spouse = spouse;
        props.children = children;
      }

      return props;
    }

    super(getSuperParameters(arguments, props));

    this.#married = props?.married ?? false; // Default to `false` if not provided
    this.#spouse = props?.spouse;
    this.#children = props?.children; // ?? []
  }

  public get married(): boolean {
    return this.#married;
  }

  public getMarried(): boolean {
    return this.#married;
  }

  public get spouse(): Person | null {
    return this.#spouse;
  }

  public getSpouse(): Person | null {
    return this.#spouse;
  }

  public get children(): Person[] | null {
    return this.#children;
  }

  public getChildren(): Person[] | null {
    return this.#children;
  }

  public override toString(): string {
    const auditString = `${super.getAttributeAuditStrings()}`;
    const attributeStringsArray = [
      `${super.constructJsonBooleanProp(this.#married, 'married', false)}`,
      `${super.constructJsonObjectProp(this.#spouse, 'spouse', false)}`,
      `${super.constructJsonArrayProp(this.#children, 'children', false)}`,
    ];
    const attributeStrings = super.concatenateAttributeStrings(attributeStringsArray);
    return `{
      ${attributeStrings}
      ${auditString.trim() === '' ? '' : `, ${auditString}`}
    }`
  }
}
