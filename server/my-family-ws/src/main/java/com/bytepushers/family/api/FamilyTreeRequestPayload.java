package com.bytepushers.family.api;

import com.bytepushers.family.model.FamilyMember;
import jakarta.validation.constraints.NotNull;

import java.util.List;

/**
 * Represents the payload for creating or updating a family tree.
 * <p>
 * This class is used as a data transfer object (DTO) to encapsulate the information
 * required for creating or updating a family tree. It includes the user ID, family tree ID,
 * and a list of {@link FamilyMember} entities.
 * </p>
 */
public class FamilyTreeRequestPayload {

    /**
     * The unique identifier of the user associated with the family tree.
     * Must not be null.
     */
    @NotNull
    private Long userId;

    /**
     * The unique identifier of the family tree.
     * Must not be null.
     */
    @NotNull
    private Long familyTreeId;

    /**
     * The list of family members in the family tree.
     * Must not be null.
     */
    @NotNull
    private List<FamilyMember> familyMembers;

    /**
     * Default constructor for {@link FamilyTreeRequestPayload}.
     * <p>
     * Required for frameworks or tools that need a no-argument constructor for deserialization.
     * </p>
     */
    public FamilyTreeRequestPayload() {
    }

    /**
     * Constructs a new {@link FamilyTreeRequestPayload} with the specified user ID, family tree ID, and family members.
     *
     * @param userId         the unique identifier of the user
     * @param familyTreeId   the unique identifier of the family tree
     * @param familyMembers  the list of family members in the family tree
     */
    public FamilyTreeRequestPayload(Long userId, Long familyTreeId, List<FamilyMember> familyMembers) {
        this.userId = userId;
        this.familyTreeId = familyTreeId;
        this.familyMembers = familyMembers;
    }

    /**
     * Gets the user ID associated with the family tree.
     *
     * @return the user ID
     */
    public Long getUserId() {
        return userId;
    }

    /**
     * Gets the family tree ID associated with the family tree.
     *
     * @return the family tree ID
     */
    public Long getFamilyTreeId() {
        return familyTreeId;
    }

    /**
     * Gets the list of family members in the family tree.
     *
     * @return a list of {@link FamilyMember} entities
     */
    public List<FamilyMember> getFamilyMembers() {
        return familyMembers;
    }
}
