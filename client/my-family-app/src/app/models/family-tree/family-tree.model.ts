import { BaseDomainModel } from '../base-domain.model';
import { FamilyTree } from './family-tree';
import { FamilyMember } from './family-member';
import { FamilyMemberModel } from './family-member.model';
import { Person } from "./person";

export class FamilyTreeModel extends BaseDomainModel implements FamilyTree {
  public name: string;
  public people: Person[];

  constructor(...args: any[])
  constructor(props: any)
  constructor(props: any) {
    super(props);
    //this.familyMembers = [...props?.familyMembers].map(familyMember => new FamilyMemberModel(familyMember));
    this.name = props?.name;
    this.people = props?.people;
  }

  public override toString(): string {
    const auditString = `${super.getAttributeAuditStrings({createdBy: this.createdBy})}`;
    //const familyMemberArrayString = this.familyMembers.map(fm => fm.toString()).join(', ');

    const s = `{
      ${super.getAttributeIdString()}
      "name": "${this.name}",
      "people": [
        ${this.people}
      ]
      ${auditString.trim() !== ''? `,${auditString}` : ''}
    }`;

    // console.log(`FamilyTreeResponseModel: ${s}`);

    return s;
  }
}
