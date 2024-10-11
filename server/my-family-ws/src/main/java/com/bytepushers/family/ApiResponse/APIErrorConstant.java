package com.bytepushers.family.ApiResponse;

public class APIErrorConstant {
    public static final String API_ERROR_USER_ALREADY_EXIST = "E001"; // User already exists
    public static final String API_ERROR_USER_NOT_FOUND = "E002";     // User not found
    public static final String API_ERROR_INVALID_USER_CREDENTIALS = "E003"; // Invalid user credentials

    // Authentication and Authorization errors
    public static final String API_ERROR_UNAUTHORIZED_ACCESS = "E004"; // Unauthorized access
    public static final String API_ERROR_TOKEN_EXPIRED = "E005";       // Token expired

    // Database-related errors
    public static final String API_ERROR_DATABASE_CONNECTION_FAILED = "E006"; // Database connection failed
    public static final String API_ERROR_DATA_NOT_FOUND = "E007";             // Data not found in the database

    // Input validation errors
    public static final String API_ERROR_INVALID_INPUT = "E008"; // Invalid input data
    public static final String API_ERROR_MISSING_REQUIRED_FIELDS = "E009"; // Missing required fields

    // General server errors
    public static final String API_ERROR_INTERNAL_SERVER_ERROR = "E500"; // Internal server error
    public static final String API_ERROR_SERVICE_UNAVAILABLE = "E503";   // Service unavailable


}
