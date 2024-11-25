import { Permission } from './permission';

export interface Role {
  name: string;
  permissions: Permission[];
}
