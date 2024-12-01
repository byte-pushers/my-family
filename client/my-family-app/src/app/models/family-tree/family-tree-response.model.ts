import { FamilyTreeResponse } from './family-tree-response';
import { FamilyMember } from './family-member';
import { RelationshipType } from './relationship-type';
import { BaseDomainModel } from '../base-domain.model';

export class FamilyTreeResponseModel extends BaseDomainModel implements FamilyTreeResponse {
  public userId: number;
  public transactionId: number;
  public familyTreeId: number;
  public relationship: RelationshipType;
  public familyMembers: FamilyMember[];

  constructor(props: any) {
    super(props);
    this.userId = props?.userId;
    this.familyTreeId = props?.familyTreeId;
    this.transactionId = props?.transactionId;
    this.relationship = props?.relationship;
    this.familyMembers = [...props?.familyMembers];
  }

  public toString(): string {
    return `{
      "userId": "${this?.userId}",
      "transactionId": "${this?.transactionId}",
      "familyTreeId": "${this?.familyTreeId}",
      "relationship": "${this?.relationship}",
      "familyMembers": [${this.familyMembers.map(fm => fm.toString()).join(', ')}]
      ${super.getAttributeAuditStrings({createdBy: this.createdBy})}
    }`;
  }
}
