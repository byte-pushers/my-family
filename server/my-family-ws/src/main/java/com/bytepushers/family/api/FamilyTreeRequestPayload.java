package com.bytepushers.family.api;

import com.bytepushers.family.model.FamilyMember;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public class FamilyTreeRequestPayload {
    @NotNull
    private Long userId;
    @NotNull
    private List<FamilyMember> familyMembers;

    public FamilyTreeRequestPayload() {

    }

    public FamilyTreeRequestPayload(Long userId, List<FamilyMember> familyMembers) {
        this.userId = userId;
        this.familyMembers = familyMembers;
    }

    public Long getUserId() {
        return userId;
    }

    public List<FamilyMember> getFamilyMembers() {
        return familyMembers;
    }
}
