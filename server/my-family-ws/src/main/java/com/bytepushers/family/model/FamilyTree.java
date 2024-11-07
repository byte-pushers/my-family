package com.bytepushers.family.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "FamilyTreeMember")
public class FamilyTree extends BaseEntity {

    private String crestImageUrl;

    // Assuming `Person` is meant to be embedded directly without an identifier of its own
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "person_id", referencedColumnName = "id")
    private Person person;


    @ManyToOne
    @JoinColumn(name = "parent_tree_id")
    private FamilyTree parentTree;

    @OneToMany(mappedBy = "parentTree", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<FamilyTree> subTrees = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "family_tree_id")
    @JsonIgnoreProperties("familyTree")
    private List<FamilyMember> familyMembers = new ArrayList<>();


    // Constructors
    public FamilyTree() {
    }

    public FamilyTree(String crestImageUrl) {
        this.crestImageUrl = crestImageUrl;
    }

    // Getters and Setters
    public String getCrestImageUrl() {
        return crestImageUrl;
    }

    public void setCrestImageUrl(String crestImageUrl) {
        this.crestImageUrl = crestImageUrl;
    }

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    public List<FamilyTree> getSubTrees() {
        return subTrees;
    }

    public void setSubTrees(List<FamilyTree> subTrees) {
        this.subTrees = subTrees;
    }

    public FamilyTree getParentTree() {
        return parentTree;
    }

    public void setParentTree(FamilyTree parentTree) {
        this.parentTree = parentTree;
    }

    public List<FamilyMember> getFamilyMembers() {
        return familyMembers;
    }

    public void setFamilyMembers(List<FamilyMember> familyMembers) {
        this.familyMembers = familyMembers;
    }

    @Override
    public String toString() {
        return super.toString().replaceFirst("}$", "") +
                ", person=" + person +
                ", familyMembers=" + familyMembers +
                ", subTrees=" + subTrees +
                '}';
    }
}
