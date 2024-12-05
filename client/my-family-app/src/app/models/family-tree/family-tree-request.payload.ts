import { FamilyMemberModel } from './family-member.model';  // Import the FamilyMember model

export class FamilyTreeRequestPayload {
  // Private fields for encapsulation
  #userId: number;
  #transactionId: string;
  #familyTreeId: number;
  #familyMembers: FamilyMemberModel[];

  // Constructor to initialize the fields
  constructor(userId: number, transactionId: string, familyTreeId: number, familyMembers: FamilyMemberModel[]) {
    this.#userId = userId;
    this.#transactionId = transactionId;
    this.#familyTreeId = familyTreeId;
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

  public setTransactionId(transactionId: string) {
    this.#transactionId = transactionId;
  }

  public get familyTreeId(): number {
    return this.#familyTreeId;
  }

  public getFamilyTreeId(): number {
    return this.#familyTreeId;
  }

  public set FamilyTreeId(familyTreeId: number) {
    this.#familyTreeId = familyTreeId;
  }

  public get familyMembers(): FamilyMemberModel[] {
    return this.#familyMembers;
  }

  public getFamilyMembers(): FamilyMemberModel[] {
    return this.#familyMembers;
  }

  public set FamilyMembers(familyMembers: FamilyMemberModel[]) {
    this.#familyMembers = familyMembers;
  }

  public toString(): string {
    return `{
      "userId": ${this.#userId},
      "transactionId:": ${this.#transactionId},
      "familyTreeId": ${this.#familyTreeId},
      "familyMembers": [
        ${this.familyMembers.map(fm => fm.toString()).join(', ')}
      ]
    }`;
  }
}
