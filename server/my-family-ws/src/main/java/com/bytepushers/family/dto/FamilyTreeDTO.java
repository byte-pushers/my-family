package com.bytepushers.family.dto;

import com.bytepushers.family.model.FamilyMember;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import java.util.List;

public class FamilyTreeDTO {

    // Immediate family fields
    @NotEmpty(message = "Parent name is required")
    @Size(min = 2, max = 20, message = "Parent name must be between 2 and 50 characters")
    private String parentName;

    @NotEmpty(message = "Parent type is required")
    @Size(min = 2, max = 20, message = "Parent type must be between 2 and 20 characters")
    private String parentType;

    @NotEmpty(message = "Grandparent name is required")
    @Size(min = 2, max = 20, message = "Grandparent name must be between 2 and 50 characters")
    private String grandParentName;

    @NotEmpty(message = "Grandparent type is required")
    @Size(min = 2, max = 20, message = "Grandparent type must be between 2 and 20 characters")
    private String grandParentType;

    @NotEmpty(message = "Sibling name is required")
    @Size(min = 2, max = 50, message = "Sibling name must be between 2 and 50 characters")
    private String siblingName;

    @NotEmpty(message = "Sibling type is required")
    @Size(min = 2, max = 20, message = "Sibling type must be between 2 and 20 characters")
    private String siblingType;

    @NotEmpty(message = "Spouse name is required")
    @Size(min = 2, max = 50, message = "Spouse name must be between 2 and 50 characters")
    private String spouseName;

    @NotEmpty(message = "Spouse type is required")
    @Size(min = 2, max = 20, message = "Spouse type must be between 2 and 20 characters")
    private String spouseType;

    @NotEmpty(message = "Children name is required")
    @Size(min = 2, max = 50, message = "Children name must be between 2 and 50 characters")
    private String childrenName;

    @NotEmpty(message = "Children type is required")
    @Size(min = 2, max = 20, message = "Children type must be between 2 and 20 characters")
    private String childrenType;

    // Extended family fields
    private String cousinName;
    private String uncleName;
    private String auntName;

    // Nested family members
    private List<FamilyMember> familyMembers;

    // Constructors, getters, and setters
    public FamilyTreeDTO() {}

    public String getParentName() {
        return parentName;
    }

    public void setParentName(String parentName) {
        this.parentName = parentName;
    }

    public String getParentType() {
        return parentType;
    }

    public void setParentType(String parentType) {
        this.parentType = parentType;
    }

    public String getGrandParentName() {
        return grandParentName;
    }

    public void setGrandParentName(String grandParentName) {
        this.grandParentName = grandParentName;
    }

    public String getGrandParentType() {
        return grandParentType;
    }

    public void setGrandParentType(String grandParentType) {
        this.grandParentType = grandParentType;
    }

    public String getSiblingName() {
        return siblingName;
    }

    public void setSiblingName(String siblingName) {
        this.siblingName = siblingName;
    }

    public String getSiblingType() {
        return siblingType;
    }

    public void setSiblingType(String siblingType) {
        this.siblingType = siblingType;
    }

    public String getSpouseName() {
        return spouseName;
    }

    public void setSpouseName(String spouseName) {
        this.spouseName = spouseName;
    }

    public String getSpouseType() {
        return spouseType;
    }

    public void setSpouseType(String spouseType) {
        this.spouseType = spouseType;
    }

    public String getChildrenName() {
        return childrenName;
    }

    public void setChildrenName(String childrenName) {
        this.childrenName = childrenName;
    }

    public String getChildrenType() {
        return childrenType;
    }

    public void setChildrenType(String childrenType) {
        this.childrenType = childrenType;
    }

    public String getCousinName() {
        return cousinName;
    }

    public void setCousinName(String cousinName) {
        this.cousinName = cousinName;
    }

    public String getUncleName() {
        return uncleName;
    }

    public void setUncleName(String uncleName) {
        this.uncleName = uncleName;
    }

    public String getAuntName() {
        return auntName;
    }

    public void setAuntName(String auntName) {
        this.auntName = auntName;
    }

    public List<FamilyMember> getFamilyMembers() {
        return familyMembers;
    }

    public void setFamilyMembers(List<FamilyMember> familyMembers) {
        this.familyMembers = familyMembers;
    }
}
