import { FamilyTree } from './family-tree';
import { FamilyTreeRequestPayload } from "./family-tree-request.payload";
import { BaseDomainModel } from "../base-domain.model";  // Import the FamilyMember model

/**
 * Class representing the payload for a family tree request.
 */
export class FamilyTreeRequestPayloadModel extends BaseDomainModel implements FamilyTreeRequestPayload {
  #userId: number;
  #transactionId: string;
  #familyTree: FamilyTree;

  constructor(...args: any[])
  constructor(props: any)
  constructor(props: any) {
    super(props);
    this.#userId = props?.userId;
    this.#transactionId = props?.transactionId;
    this.#familyTree = props?.familyTree;
  }

  public get userId(): number {
    return this.#userId;
  }

  public getUserId(): number {
    return this.#userId;
  }

  public set userId(userId: number) {
    this.#userId = userId;
  }

  public get transactionId(): string {
    return this.#transactionId
  }

  public getTransactionId(): string {
    return this.#transactionId
  }

  public setTransactionId(transactionId: string) {
    this.#transactionId = transactionId;
  }

  public set transactionId(transactionId: string) {
    this.#transactionId = transactionId;
  }

  public get familyTree(): FamilyTree {
    return this.#familyTree;
  }

  public getFamilyTree(): FamilyTree {
    return this.#familyTree;
  }

  public set familyTree(familyTree: FamilyTree) {
    this.#familyTree = familyTree;
  }

  public setFamilyTree(familyTree: FamilyTree) {
    this.#familyTree = familyTree;
  }

  public override toString(): string {
    const auditString = `${super.getAttributeAuditStrings({createdBy: this.createdBy})}`;
    return `{
      "userId": ${this.userId},
      "transactionId": "${this.transactionId}",
      "familyTree": ${this.familyTree},
      ${auditString.trim() !== ''? `,${auditString}` : ''}
    }`;
  }
}
