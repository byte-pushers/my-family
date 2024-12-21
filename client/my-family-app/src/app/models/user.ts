import { Role } from "./role";
import { FamilyMember } from "./family-tree/family-member";

export interface User {
  username: string;
  password: string;
  roles: Role[];
  familyMembers: FamilyMember[];
}
