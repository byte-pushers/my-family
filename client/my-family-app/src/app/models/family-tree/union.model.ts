import { BaseDomainModel } from '../base-domain.model';
import { Person } from './person';
import { PersonModel } from './person.model';

export class UnionModel extends BaseDomainModel {
  readonly #id: number;
  readonly #married: boolean;
  readonly #spouse: PersonModel;
  readonly #children: PersonModel[];

  constructor(...args: any[])
  constructor(props: any)
  constructor(
    id: number,
    married: boolean,
    spouse: PersonModel,
    children: PersonModel[],
    createdBy?: string,
    createdDate?: Date,
    updatedBy?: string,
    updatedDate?: Date
  )
  constructor() {
    const props: any = {};

    function getSuperParameters(args: IArguments, props: any): any {
      if (args.length === 1) {
        props.id = args[0].id;
        props.married = args[0].married;
        props.spouse = new PersonModel(args[0].spouse);
        props.children = args[0].children?.map((child: any) => new PersonModel(child)) || [];
        props.createdBy = args[0].createdBy;
        props.createdDate = args[0].createdDate;
        props.updatedBy = args[0].updatedBy;
        props.updatedDate = args[0].updatedDate;
      } else {
        const id = args[0];
        const married = args[1];
        const spouse = args[2];
        const children = args[3];
        const createdBy = args[4];
        const createdDate = args[5];
        const updatedBy = args[6];
        const updatedDate = args[7];

        props.id = id;
        props.married = married;
        props.spouse = new PersonModel(spouse);
        props.children = children?.map((child: any) => new PersonModel(child)) || [];
        props.createdBy = createdBy;
        props.createdDate = createdDate;
        props.updatedBy = updatedBy;
        props.updatedDate = updatedDate;
      }

      return props;
    }

    super(getSuperParameters(arguments, props));

    this.#id = props?.id;
    this.#married = props?.married ?? false; // Default to `false` if not provided
    this.#spouse = props?.spouse;
    this.#children = props?.children ?? [];
  }

/*  public get id(): number {
    return this.#id;
  }*/

  public get married(): boolean {
    return this.#married;
  }

  public get spouse(): PersonModel {
    return this.#spouse;
  }

  public get children(): PersonModel[] {
    return this.#children;
  }

  public override toString(): string {
    const auditString = `${super.getAttributeAuditStrings()}`;
    return `{
      ${super.getAttributeIdString()}
      "id": ${this.#id},
      "married": ${this.#married},
      "spouse": ${JSON.stringify(this.#spouse)},
      "children": ${JSON.stringify(this.#children)}
      ${auditString.trim() === '' ? '' : `, ${auditString}`}
   }`;
  }
}
