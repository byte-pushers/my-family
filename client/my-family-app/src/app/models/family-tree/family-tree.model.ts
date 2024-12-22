import { BaseDomainModel } from '../base-domain.model';
import { FamilyTree } from './family-tree';
import { FamilyMember } from './family-member';
import { FamilyMemberModel } from './family-member.model';

export class FamilyTreeModel extends BaseDomainModel implements FamilyTree {
  public familyMembers: FamilyMember[];

  constructor(...args: any[])
  constructor(props: any)
  constructor(props: any) {
    super(props);
    this.familyMembers = [...props?.familyMembers].map(familyMember => new FamilyMemberModel(familyMember));
  }

  public override toString(): string {
    const auditString = `${super.getAttributeAuditStrings({createdBy: this.createdBy})}`;
    const familyMemberArrayString = this.familyMembers.map(fm => fm.toString()).join(', ');

    const s = `{
      ${super.getAttributeIdString()}
      "familyMembers": [
        ${familyMemberArrayString}
      ]${auditString.trim() !== ''? `,\n\t  ${auditString}` : ''}
    }`;

    console.log(`FamilyTreeResponseModel: ${s}`);

    return s;
  }
}
