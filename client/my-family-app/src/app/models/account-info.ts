import { Address } from './address';
import { PhoneNumber } from './phone-number';

export interface AccountInfo {
  firstName: string | null;
  middleName: string | null;
  lastName: string | null;
  email: string | null;
  password: string | null;
  phoneNumber: PhoneNumber | null;
  address: Address | null;
}
