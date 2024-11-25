export interface ErrorInfoProperties {
  code?: string;
  type?: string;
  message?: string;
  field?: { name: string; min?: number; max?: number; required?: boolean };
}
