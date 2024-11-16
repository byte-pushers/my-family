export interface ProfileData {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  age: number;
  address: string;
  spouse?: string;
  children?: string[];
  parents: {
    mother?: string;
    father?: string;
  };
  siblings?: string[];
  profileImage?: string;
}
