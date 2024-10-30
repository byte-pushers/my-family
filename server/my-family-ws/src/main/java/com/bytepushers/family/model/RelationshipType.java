package com.bytepushers.family.model;
import com.fasterxml.jackson.annotation.JsonCreator;
import java.util.HashMap;
import java.util.Map;

public enum RelationshipType {
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
    private static final Map<String, RelationshipType> RELATIONSHIP_TYPE_MAP = new HashMap<>();

    // Populate the map with uppercase values of each enum constant
    static {
        for (RelationshipType type : RelationshipType.values()) {
            RELATIONSHIP_TYPE_MAP.put(type.name(), type);
        }
    }
    // Custom method for case-insensitive parsing
    @JsonCreator
    public static RelationshipType fromString(String value) {
        if (value == null) {
            throw new IllegalArgumentException("Relationship type cannot be null");
        }
        String formattedValue = value.toUpperCase().replace(" ", "_");
        RelationshipType type = RELATIONSHIP_TYPE_MAP.get(formattedValue);
        if (type == null) {
            throw new IllegalArgumentException("Invalid relationship type: " + value);
        }
        return type;
    }
}
