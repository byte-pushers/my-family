package com.bytepushers.family.familyTree.Model;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table( name = "FamilyTreeMember")
public class FamilyTree {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    // Immediate family
    @NotEmpty(message = "Parent name is required")
    @Size(min = 2, max = 20, message = "Parent name must be between 2 and 20 characters")
    @Column( name ="parentName")
    private String parentName = "";
    @NotEmpty(message = "ParentType is required")
    @Size(min = 2, max = 20, message = "ParentType must be between 2 and 20 characters")
    @Column( name ="parentType")
    private String parentType = "";
    @NotEmpty
    @Size(min = 2, max = 20, message = "GrandParentName is required")
    @Column( name ="grandParentName")
    private String grandParentName = "";
    @NotEmpty
    @Size(min = 2, max = 20, message = "GrantParentType must be between 2 and 20 characters")
    @Column( name ="grandParentType")
    private String grandParentType = "";
    @Size(min = 2, max = 20, message = "Sibling name must be between 2 and 20 characters")
    @Column(name = "siblingName")
    private String siblingName = "";

    @Size(min = 2, max = 20, message = "Sibling type must be between 2 and 20 characters")
    @Column(name = "siblingType")
    private String siblingType = "";

    @Size(min = 2, max = 20, message = "Spouse name must be between 2 and 20 characters")
    @Column(name = "spouseName")
    private String spouseName = "";

    @Size(min = 2, max = 20, message = "Spouse type must be between 2 and 20 characters")
    @Column(name = "spouseType")
    private String spouseType = "";

    @Size(min = 2, max = 20, message = "Children name must be between 2 and 20 characters")
    @Column(name = "childrenName")
    private String childrenName = "";

    @Size(min = 2, max = 20, message = "Children type must be between 2 and 20 characters")
    @Column(name = "childrenType")
    private String childrenType = "";

    // Extended family - Optional fields
    @Size(min = 2, max = 20, message = "Cousin name must be between 2 and 20 characters")
    @Column(name = "cousinName")
    private String cousinName = "";

    @Size(min = 2, max = 20, message = "Uncle name must be between 2 and 20 characters")
    @Column(name = "uncleName")
    private String uncleName = "";

    @Size(min = 2, max = 20, message = "Aunt name must be between 2 and 20 characters")
    @Column(name = "auntName")
    private String auntName = "";

    // Lists for family members
    @ElementCollection
    private List<String> parentsList = new ArrayList<>();
    private List<String> grandParentList = new ArrayList<>();
    private List<String> siblingList = new ArrayList<>();
    private List<String> spouseList = new ArrayList<>();
    private List<String> childrenList = new ArrayList<>();
    private List<String> cousinsList = new ArrayList<>();
    private List<String> unclesList = new ArrayList<>();
    private List<String> auntsList = new ArrayList<>();

    public FamilyTree(String parentName, String parentType, String grandParentName, String grandParentType, String siblingName, String siblingType, String spouseName, String spouseType, String childrenName, String childrenType, String cousinName, String uncleName, String auntName, List<String> parentsList, List<String> grandParentList, List<String> siblingList, List<String> spouseList, List<String> childrenList, List<String> cousinsList, List<String> unclesList, List<String> auntsList) {
        this.parentName = parentName;
        this.parentType = parentType;
        this.grandParentName = grandParentName;
        this.grandParentType = grandParentType;
        this.siblingName = siblingName;
        this.siblingType = siblingType;
        this.spouseName = spouseName;
        this.spouseType = spouseType;
        this.childrenName = childrenName;
        this.childrenType = childrenType;
        this.cousinName = cousinName;
        this.uncleName = uncleName;
        this.auntName = auntName;
        this.parentsList = parentsList;
        this.grandParentList = grandParentList;
        this.siblingList = siblingList;
        this.spouseList = spouseList;
        this.childrenList = childrenList;
        this.cousinsList = cousinsList;
        this.unclesList = unclesList;
        this.auntsList = auntsList;
    }

    public FamilyTree() {

    }

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

    public List<String> getParentsList() {
        return parentsList;
    }

    public void setParentsList(List<String> parentsList) {
        this.parentsList = parentsList;
    }

    public List<String> getGrandParentList() {
        return grandParentList;
    }

    public void setGrandParentList(List<String> grandParentList) {
        this.grandParentList = grandParentList;
    }

    public List<String> getSiblingList() {
        return siblingList;
    }

    public void setSiblingList(List<String> siblingList) {
        this.siblingList = siblingList;
    }

    public List<String> getSpouseList() {
        return spouseList;
    }

    public void setSpouseList(List<String> spouseList) {
        this.spouseList = spouseList;
    }

    public List<String> getChildrenList() {
        return childrenList;
    }

    public void setChildrenList(List<String> childrenList) {
        this.childrenList = childrenList;
    }

    public List<String> getCousinsList() {
        return cousinsList;
    }

    public void setCousinsList(List<String> cousinsList) {
        this.cousinsList = cousinsList;
    }

    public List<String> getUnclesList() {
        return unclesList;
    }

    public void setUnclesList(List<String> unclesList) {
        this.unclesList = unclesList;
    }

    public List<String> getAuntsList() {
        return auntsList;
    }

    public void setAuntsList(List<String> auntsList) {
        this.auntsList = auntsList;
    }

    public void setId(long id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "FamilyTree{" +
                "parentName='" + parentName + '\'' +
                ", parentType='" + parentType + '\'' +
                ", grandParentName='" + grandParentName + '\'' +
                ", grandParentType='" + grandParentType + '\'' +
                ", siblingName='" + siblingName + '\'' +
                ", siblingType='" + siblingType + '\'' +
                ", spouseName='" + spouseName + '\'' +
                ", spouseType='" + spouseType + '\'' +
                ", childrenName='" + childrenName + '\'' +
                ", childrenType='" + childrenType + '\'' +
                ", cousinName='" + cousinName + '\'' +
                ", uncleName='" + uncleName + '\'' +
                ", auntName='" + auntName + '\'' +
                ", parentsList=" + parentsList +
                ", grandParentList=" + grandParentList +
                ", siblingList=" + siblingList +
                ", spouseList=" + spouseList +
                ", childrenList=" + childrenList +
                ", cousinsList=" + cousinsList +
                ", unclesList=" + unclesList +
                ", auntsList=" + auntsList +
                '}';
    }

    // Inner class to represent name and type pair
    public static class NameType {
        private String name;
        private String type;

        public NameType(String name, String type) {
            this.name = name;
            this.type = type;
        }

        // Getters and setters
        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getType() {
            return type;
        }

        public void setType(String type) {
            this.type = type;
        }
    }
    public long getId() {
        return id;
    }
}
