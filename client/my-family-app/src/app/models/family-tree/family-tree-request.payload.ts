import { FamilyMemberModel } from './family-member.model';  // Import the FamilyMember model

export class FamilyTreeRequestPayload {
  #userId: number;
  #transactionId: string;
  #familyMembers: FamilyMemberModel[];

  constructor(userId: number, transactionId: string, familyTreeId: number, familyMembers: FamilyMemberModel[]) {
    this.#userId = userId;
    this.#transactionId = transactionId;
    this.#familyMembers = [...familyMembers].map(familyMember => new FamilyMemberModel(familyMember));
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

  public set transactionId(transactionId: string) {
    this.#transactionId = transactionId;
  }

  public get familyMembers(): FamilyMemberModel[] {
    return this.#familyMembers;
  }

  public getFamilyMembers(): FamilyMemberModel[] {
    return this.#familyMembers;
  }

  public set familyMembers(familyMembers: FamilyMemberModel[]) {
    this.#familyMembers = familyMembers;
  }

  public toString(): string {
    return `{
      "userId": ${this.#userId},
      "transactionId:": ${this.#transactionId},
      "familyMembers": [
        ${this.familyMembers.map(fm => fm.toString()).join(', ')}
      ]
    }`;
  }
}
