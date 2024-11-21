export interface ProfileData {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  nickName?: string;
  dateOfBirth: string;
  age: number;
  email: string;
  phone?: string;
  address: string;
  spouse?: string;
  children?: string[];
  parents: {
    mother: string;
    father: string;
  };
  siblings?: string[];
  profileImage?: string;
}
