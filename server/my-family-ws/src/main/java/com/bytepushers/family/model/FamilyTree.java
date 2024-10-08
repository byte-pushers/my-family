package com.bytepushers.family.model;

import jakarta.persistence.*;
import com.bytepushers.family.model.FamilyTree;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@Entity
public class FamilyTree {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long Id;

    private String parentName;
    private String parentType;
    private String grandParentName;
    private String grandParentType;
    private String siblingName;
    private String siblingType;
    private String spouseName;
    private String spouseType;
    private String childrenName;
    private String childrenType;
    @ElementCollection
    private List<String> parentsList;
    @ElementCollection
    private List<String>  grandParentList;
    @ElementCollection
    private List<String>  siblingList;
    @ElementCollection
    private List<String>  spouseList;
    @ElementCollection
    private List<String>  childrenList;


    // Constructor
    public FamilyTree(String parentName, String parentType, String grandParentName, String grandParentType,
                          String siblingName, String siblingType, String spouseName, String spouseType,
                          String childrenName, String childrenType, List<String> parentsList,
                          List<String> grandParentList, List<String> siblingList, List<String> spouseList,
                          List<String> childrenList) {
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
        this.parentsList = parentsList;
        this.grandParentList = grandParentList;
        this.siblingList = siblingList;
        this.spouseList = spouseList;
        this.childrenList = childrenList;
    }

    public FamilyTree() {

    }


    // Setters
    public void setParentName(String parentName) {
        this.parentName = parentName;
    }
    public String getParentName() {
        return parentName;
    }
    public void setParentType(String parentType) {
        this.parentType = parentType;
    }

    public void setGrandParentName(String grandParentName) {
        this.grandParentName = grandParentName;
    }

    public void setGrandParentType(String grandParentType) {
        this.grandParentType = grandParentType;
    }

    public void setSiblingName(String siblingName) {
        this.siblingName = siblingName;
    }

    public void setSiblingType(String siblingType) {
        this.siblingType = siblingType;
    }

    public void setSpouseName(String spouseName) {
        this.spouseName = spouseName;
    }

    public void setSpouseType(String spouseType) {
        this.spouseType = spouseType;
    }

    public void setChildrenName(String childrenName) {
        this.childrenName = childrenName;
    }

    public void setChildrenType(String childrenType) {
        this.childrenType = childrenType;
    }

    public void setParentsList(List<String> parentsList) {
        this.parentsList = parentsList;
    }

    public void setGrandParentList(List<String> grandParentList) {
        this.grandParentList = grandParentList;
    }

    public void setSiblingList(List<String> siblingList) {
        this.siblingList = siblingList;
    }

    public void setSpouseList(List<String> spouseList) {
        this.spouseList = spouseList;
    }

    public void setChildrenList(List<String> childrenList) {
        this.childrenList = childrenList;
    }
    // toString method
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
                ", parentsList=" + parentsList +
                ", grandParentList=" + grandParentList +
                ", siblingList=" + siblingList +
                ", spouseList=" + spouseList +
                ", childrenList=" + childrenList +
                '}';
    }
}
