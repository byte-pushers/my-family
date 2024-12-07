import { FamilyTreeResponse } from './family-tree-response';
import { BaseDomainModel } from '../base-domain.model';
import { FamilyTree } from './family-tree';

export class FamilyTreeResponseModel extends BaseDomainModel implements FamilyTreeResponse {
  public familyTree: FamilyTree;

  constructor(props: any) {
    super(props);
    this.familyTree = props?.familyTree;
  }

  public override toString(): string {
    const auditString = `${super.getAttributeAuditStrings({createdBy: this.createdBy})}`;
    const s = `{
      ${super.getAttributeIdString()}
      "familyTree": "${this?.familyTree}"
      ]${auditString.trim() !== ''? `,\n\t  ${auditString}` : ''}
    }`;

    console.log(`FamilyTreeResponseModel: ${s}`);

    return s;
  }
}
