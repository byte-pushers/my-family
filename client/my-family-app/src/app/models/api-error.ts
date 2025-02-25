export interface ApiError {
    code: string;
    message: string;
    messageKey: string | null;
    details: {
        fieldName: []
    }
}

export interface ErrorObject {
    errors: ApiError[];
}
