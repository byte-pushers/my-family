package com.bytepushers.family.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "family_tree_member")
public class FamilyTree extends BaseEntity {

    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "relationship")
    private String relationship;

    @Column(name = "parent_type")
    private String parentType;

    @Column(name = "parent_name")
    private String parentName;

    @Column(name = "grand_parent_type")
    private String grandParentType;

    @Column(name = "grand_parent_name")
    private String grandParentName;

    // Assuming `Person` is meant to be embedded directly without an identifier of its own
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "person_id", referencedColumnName = "id")
    private Person person;

    @OneToMany(mappedBy = "familyTree", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<FamilyMember> familyMembers = new ArrayList<>();

    // Constructors
    public FamilyTree() {
    }

    public FamilyTree(String relationship, Person person) {
        this.relationship = relationship;
        this.person = person;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getParentType() {
        return parentType;
    }

    public void setParentType(String parentType) {
        this.parentType = parentType;
    }

    // Getters and Setters
    public String getRelationship() {
        return relationship;
    }

    public void setRelationship(String relationship) {
        this.relationship = relationship;
    }

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
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
                ", relationship='" + relationship + '\'' +
                ", person=" + person +
                ", familyMembers=" + familyMembers +
                '}';
    }
}