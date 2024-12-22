package com.bytepushers.family.api;

import com.bytepushers.family.model.FamilyTree;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public class FamilyTreeRequestPayload {
    /**
     * The unique identifier of the user associated with the family tree.
     * Must not be null.
     */
    @NotNull
    private Long userId;

    @NotNull
    private String transactionId;

    /**
     * The list of family members in the family tree.
     * Must not be null.
     */
    @NotNull
    private FamilyTree familyTree;

    /**
     * Default constructor for {@link FamilyTreeRequestPayload}.
     * <p>
     * Required for frameworks or tools that need a no-argument constructor for deserialization.
     * </p>
     */
    public FamilyTreeRequestPayload() {
    }

    public FamilyTreeRequestPayload(Long userId, String transactionId, FamilyTree familyTree) {
        this.userId = userId;
        this.transactionId = transactionId;
        this.familyTree = familyTree;
    }

    /**
     * Gets the user ID associated with the family tree.
     *
     * @return the user ID
     */
    public Long getUserId() {
        return this.userId;
    }

    public void setUserId(@NotNull Long userId) {
        this.userId = userId;
    }

    /**
     * Gets the transaction ID associated.
     *
     * @return the request transaction ID
     */
    public String getTransactionId() {
        return this.transactionId;
    }

    public void setTransactionId(@NotNull String transactionId) {
        this.transactionId = transactionId;
    }

    /**
     * Gets family tree.
     *
     * @return a list of {@link FamilyTree} entities
     */
    public FamilyTree getFamilyTree() {
        return this.familyTree;
    }

    public void setFamilyTree(@NotNull FamilyTree familyTree) {
        this.familyTree = familyTree;
    }
}
