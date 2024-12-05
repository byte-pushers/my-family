import { BaseDomainModel } from '../base-domain.model';  // Import BaseDomainModel
import { Person } from './person';                      // Import Person
import { RelationshipType } from './relationship-type';
import { FamilyMember } from './family-member';
import { PersonModel } from './person.model'; // Import RelationshipType

export class FamilyMemberModel extends BaseDomainModel implements FamilyMember {
  readonly #relationship: RelationshipType;
  readonly #person: Person;

  constructor(...args: any[])
  constructor(props: any)
  constructor(id: number, relationship: RelationshipType, person: Person, createdBy: string, createdDate: Date, updatedBy: string, updatedDate: Date)
  constructor() {
    const props: any = {};

    function getSuperParameters(args: IArguments, props: any): any {
      if (args.length === 1) {
        props.id = args[0].id;
        props.relationship = args[0].relationship;
        props.person = args[0].person;
        props.createdBy = args[0].createdBy;
        props.createdDate = args[0].createdDate;
        props.updatedBy = args[0].updatedBy;
        props.updatedBy = args[0].updatedBy;
      } else {
        const id = args[0];
        const relationship = args[1];
        const person = args[2];
        const createdBy = args[3];
        const createdDate = args[4];
        const updatedBy = args[5];
        const updatedDate = args[6];

        props.id = id;
        props.relationship = relationship;
        props.person = person;
        props.createdBy = createdBy;
        props.createdDate = createdDate;
        props.updatedBy = updatedBy;
        props.updatedDate = updatedDate;

        // props = {id: id, relationship, person, createdBy: createdBy, createdDate: createdDate, updatedBy: updatedBy, updatedDate: updatedDate};
      }

      return props;
    }

    super(getSuperParameters(arguments, props));
    this.#relationship = props?.relationship;
    this.#person = new PersonModel(props?.person);
  }

  // Getters
  public get relationship(): RelationshipType {
    return this.#relationship;
  }

  public get person(): Person {
    return this.#person;
  }

  public override toString(): string {
    const auditString = `${super.getAttributeAuditStrings({createdBy: this.createdBy, updatedDate: this.updatedDate})}`;
    return`{
      ${super.getAttributeIdString()}
      "relationship": "${this?.relationship}",
      "person": ${this?.person?.toString()}${auditString.trim() === ''? `,\n\t  ${auditString}` : ''}
    }`;
  }
}
