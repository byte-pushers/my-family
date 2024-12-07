import { FamilyTreeResponse } from './family-tree-response';
import { BaseDomainModel } from '../base-domain.model';
import { FamilyTree } from './family-tree';

export class FamilyTreeResponseModel extends BaseDomainModel implements FamilyTreeResponse {
  public data: FamilyTree;

  constructor(props: any) {
    super(props);
    this.data = props?.familyTree;
  }

  public override toString(): string {
    const auditString = `${super.getAttributeAuditStrings({createdBy: this.createdBy})}`;
    const s = `{
      ${super.getAttributeIdString()}
      "data": "${this?.data}"
      ]${auditString.trim() !== ''? `,\n\t  ${auditString}` : ''}
    }`;

    console.log(`FamilyTreeResponseModel: ${s}`);

    return s;
  }
}
