import { FamilyMemberModel } from './family-member.model';
import { FamilyTree } from './family-tree';  // Import the FamilyMember model

export class FamilyTreeRequestPayload {
  #userId: number;
  #transactionId: string;
  #familyTree: FamilyTree;

  constructor(userId: number, transactionId: string, familyTree: FamilyTree) {
    this.#userId = userId;
    this.#transactionId = transactionId;
    this.#familyTree = familyTree;
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

  public toString(): string {
    return `{
      "userId": ${this.#userId},
      "transactionId:": ${this.#transactionId},
      "familyTree": ${this.familyTree}
    }`;
  }
}
