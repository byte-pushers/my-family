import { BaseDomainModel } from '../base-domain.model';
import { FamilyTree } from './family-tree';
import { RelationshipType } from './relationship-type';
import { FamilyMember } from './family-member';
import { FamilyMemberModel } from './family-member.model';

export class FamilyTreeModel extends BaseDomainModel implements FamilyTree {
  public relationship: RelationshipType;
  public familyMembers: FamilyMember[];

  constructor(props: any) {
    super(props);
    this.relationship = props?.relationship;
    this.familyMembers = [...props?.familyMembers].map(familyMember => new FamilyMemberModel(familyMember));
  }

  public override toString(): string {
    const auditString = `${super.getAttributeAuditStrings({createdBy: this.createdBy})}`;
    const s = `{
      ${super.getAttributeIdString()}
      "relationship": "${this?.relationship}",
      "familyMembers": [
        ${this.familyMembers.map(fm => fm.toString()).join(', ')}
      ]${auditString.trim() !== ''? `,\n\t  ${auditString}` : ''}
    }`;

    console.log(`FamilyTreeResponseModel: ${s}`);

    return s;
  }
}
