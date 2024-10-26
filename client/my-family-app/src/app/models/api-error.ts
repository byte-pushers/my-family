export interface ApiError {
  code: string;
  message: string;
  messageKey: string | null;
}

export interface ErrorObject {
  errors: ApiError[];
}
