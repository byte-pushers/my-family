package com.bytepushers.family.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "family_members")
public class FamilyMember extends BaseEntity {

    @NotEmpty(message = "Relationship is required")
    private String relationship;

    @ManyToOne
    @JoinColumn(name = "person_id")
    private Person person;

    // Parent reference for the bidirectional relationship
    @ManyToOne
    @JoinColumn(name = "parent_member_id")
    @JsonBackReference
    private FamilyMember parent;

    // Recursive reference for child members
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "parent")
    @JsonManagedReference
    private List<FamilyMember> familyMembers;

    // Many-to-one relationship with FamilyTree (if needed)
    @ManyToOne
    @JoinColumn(name = "family_tree_id")
    private FamilyTree familyTree;

    public FamilyMember(Integer id, String createdBy, String updatedBy, LocalDateTime createdDate, LocalDateTime updatedDate) {
        super(id, createdBy, updatedBy, createdDate, updatedDate);
    }

    // Default constructor
    public FamilyMember() {
    }

    public FamilyMember(String relationship, Person person) {
        this.relationship = relationship;
        this.person = person;
    }

    public FamilyMember(Integer id, String createdBy, String updatedBy, LocalDateTime createdDate, LocalDateTime updatedDate, String relationship, Person person, FamilyMember parent, List<FamilyMember> familyMembers) {
        super(id, createdBy, updatedBy, createdDate, updatedDate);
        this.relationship = relationship;
        this.person = person;
        this.parent = parent;
        this.familyMembers = familyMembers;
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

    public FamilyMember getParent() {
        return parent;
    }

    public void setParent(FamilyMember parent) {
        this.parent = parent;
    }

    public List<FamilyMember> getFamilyMembers() {
        return familyMembers;
    }

    public void setFamilyMembers(List<FamilyMember> familyMembers) {
        this.familyMembers = familyMembers;
    }

    public FamilyTree getFamilyTree() {
        return familyTree;
    }

    public void setFamilyTree(FamilyTree familyTree) {
        this.familyTree = familyTree;
    }

    @Override
    public String toString() {
        return "FamilyMember{" +
                "id=" + getId() +
                ", relationship='" + relationship + '\'' +
                ", person=" + (person != null ? person.getFirstName() + " " + person.getLastName() : "null") +
                ", parent=" + (parent != null ? parent.getId() : "null") +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof FamilyMember)) return false;
        if (!super.equals(o)) return false;

        FamilyMember that = (FamilyMember) o;
        return Objects.equals(relationship, that.relationship) &&
                Objects.equals(person, that.person) &&
                Objects.equals(parent, that.parent);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), relationship, person, parent);
    }
}