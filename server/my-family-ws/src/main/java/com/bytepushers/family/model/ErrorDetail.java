package com.bytepushers.family.model;


import java.util.List;

/**
 * The {@code ErrorDetail} class represents details about validation errors or
 * issues encountered in a request. It is primarily used to encapsulate field-level
 * error messages for use in error responses.
 *
 * <p>Attributes:</p>
 * <ul>
 *   <li>{@code fieldName} - A list of field names where errors occurred.</li>
 * </ul>
 *
 * <p>This class is useful in contexts such as form validation or API error reporting,
 * where multiple fields may have associated validation errors.</p>
 *
 * <p>Methods:</p>
 * <ul>
 *   <li>{@code getFieldName()} - Retrieves the list of field names with errors.</li>
 *   <li>{@code setFieldName(List<String> fieldName)} - Sets the list of field names with errors.</li>
 * </ul>
 *
 * <p>Author: Adish Timalsina</p>
 */
public class ErrorDetail {

    /** A list of field names where errors occurred. */
    private List<String> fieldName;

    /**
     * Constructs an {@code ErrorDetail} object with the specified list of field names.
     *
     * @param fieldName the list of field names with errors.
     */
    public ErrorDetail(List<String> fieldName) {
        this.fieldName = fieldName;
    }

    /**
     * Retrieves the list of field names with errors.
     *
     * @return the list of field names.
     */
    public List<String> getFieldName() {
        return fieldName;
    }

    /**
     * Sets the list of field names with errors.
     *
     * @param fieldName the list of field names.
     */
    public void setFieldName(List<String> fieldName) {
        this.fieldName = fieldName;
    }
}