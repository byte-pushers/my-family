package com.bytepushers.family.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import java.util.HashMap;
import java.util.Map;

/**
 * Represents the various types of familial relationships.
 * This enum is used to categorize relationships within a family structure.
 */
public enum Relationship {
    MOM,
    DAD,
    BROTHER,
    SISTER,
    SON,
    DAUGHTER,
    GRANDMA,
    GRANDPA,
    COUSIN,
    AUNT,
    UNCLE,
    SPOUSE,
    FATHER,
    MOTHER,
    GRAND_FATHER,
    GRAND_MOTHER,
    CHILD;

    // Static map for case-insensitive lookup
    private static final Map<String, Relationship> RELATIONSHIP_MAP = new HashMap<>();

    // Populate the map with uppercase values of each enum constant
    static {
        for (Relationship relationship : Relationship.values()) {
            RELATIONSHIP_MAP.put(relationship.name(), relationship);
        }
    }

    // Custom method for case-insensitive parsing
    @JsonCreator
    public static Relationship fromString(String value) {
        if (value == null || value.trim().isEmpty()) {
            throw new IllegalArgumentException("Relationship type cannot be null or empty");
        }
        String formattedValue = value.toUpperCase().replace(" ", "_");
        Relationship relationship = RELATIONSHIP_MAP.get(formattedValue);
        if (relationship == null) {
            throw new IllegalArgumentException("Invalid relationship type: " + value);
        }
        return relationship;
    }
}