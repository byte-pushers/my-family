import { FamilyMember } from './family-member.model';  // Import the FamilyMember model

export class FamilyTreeRequestPayload {
  constructor(
    public parents: FamilyMember[],
    public grandparents: FamilyMember[],
    public siblings: FamilyMember[],
    public spouse: FamilyMember,
    public children: FamilyMember[],
    public cousins: FamilyMember[],
    public uncles: FamilyMember[],
    public aunts: FamilyMember[]
  ) {}
}
