package com.bytepushers.family.model;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/**
 * Represents a family member entity in the system.
 * This class models the relationship of a person within a family tree, supporting recursive relationships
 * (e.g., parent-child) and linking to a {@link FamilyTree}.
 * <p>
 * Extends {@link BaseIdGeneratedValueEntity} to include common entity fields like ID and timestamps.
 * </p>
 */
@Entity
@Table(name = "family_members")
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id" // Unique identifier for managing references
)
public class FamilyMember extends BaseIdGeneratedValueEntity {

    /** The relationship type of this family member (e.g., Parent, Sibling). */
    @Column(name = "relationship")
    @NotEmpty(message = "Relationship is required")
    private String relationship;

    /** The person associated with this family member. */
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "person_id")
    private Person person;

    /** The parent family member in a bidirectional relationship. */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_member_id")
    private FamilyMember parent;

    /** The child family members associated with this family member, forming a recursive relationship. */
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "parent")
    private List<FamilyMember> familyMembers = new ArrayList<>();

    /** The family tree this family member is part of. Ignored in JSON serialization to prevent recursion. */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "family_tree_id")
    @JsonIgnore
    private FamilyTree familyTree;

    /**
     * Constructs a FamilyMember with metadata and ID, extending {@link BaseIdGeneratedValueEntity}.
     *
     * @param id           the unique identifier of this family member
     * @param createdBy    the username of the entity creator
     * @param updatedBy    the username of the last updater
     * @param createdDate  the date when the entity was created
     * @param updatedDate  the date when the entity was last updated
     */
    public FamilyMember(Long id, String createdBy, String updatedBy, LocalDateTime createdDate, LocalDateTime updatedDate) {
        super(id, createdBy, updatedBy, createdDate, updatedDate);
    }

    /**
     * Default constructor for FamilyMember.
     * Required for frameworks like Hibernate to instantiate objects.
     */
    public FamilyMember() {
    }

    /**
     * Constructs a FamilyMember with a specified relationship and associated person.
     *
     * @param relationship the type of relationship (e.g., Parent, Sibling)
     * @param person       the person associated with this family member
     */
    public FamilyMember(String relationship, Person person) {
        this.relationship = relationship;
        this.person = person;
    }

    /**
     * Constructs a FamilyMember with all fields, including recursive and parent-child relationships.
     *
     * @param id            the unique identifier of this family member
     * @param createdBy     the username of the entity creator
     * @param updatedBy     the username of the last updater
     * @param createdDate   the date when the entity was created
     * @param updatedDate   the date when the entity was last updated
     * @param relationship  the type of relationship
     * @param person        the person associated with this family member
     * @param parent        the parent family member
     * @param familyMembers the list of child family members
     */
    public FamilyMember(Long id, String createdBy, String updatedBy, LocalDateTime createdDate, LocalDateTime updatedDate,
                        String relationship, Person person, FamilyMember parent, List<FamilyMember> familyMembers) {
        super(id, createdBy, updatedBy, createdDate, updatedDate);
        this.relationship = relationship;
        this.person = person;
        this.parent = parent;
        this.familyMembers = familyMembers;
    }

    /**
     * Gets the relationship type of this family member.
     *
     * @return the relationship type
     */
    public String getRelationship() {
        return relationship;
    }

    /**
     * Sets the relationship type for this family member.
     *
     * @param relationship the relationship type
     */
    public void setRelationship(String relationship) {
        this.relationship = relationship;
    }

    /**
     * Gets the associated person of this family member.
     *
     * @return the associated {@link Person}
     */
    public Person getPerson() {
        return person;
    }

    /**
     * Sets the associated person of this family member.
     *
     * @param person the associated {@link Person}
     */
    public void setPerson(Person person) {
        this.person = person;
    }

    /**
     * Gets the parent family member.
     *
     * @return the parent {@link FamilyMember}
     */
    public FamilyMember getParent() {
        return parent;
    }

    /**
     * Sets the parent family member.
     *
     * @param parent the parent {@link FamilyMember}
     */
    public void setParent(FamilyMember parent) {
        this.parent = parent;
    }

    /**
     * Gets the list of child family members.
     *
     * @return the list of child {@link FamilyMember}s
     */
    public List<FamilyMember> getFamilyMembers() {
        return familyMembers;
    }

    /**
     * Sets the list of child family members.
     *
     * @param familyMembers the list of child {@link FamilyMember}s
     */
    public void setFamilyMembers(List<FamilyMember> familyMembers) {
        this.familyMembers = familyMembers;
    }

    /**
     * Gets the associated family tree of this family member.
     *
     * @return the associated {@link FamilyTree}
     */
    public FamilyTree getFamilyTree() {
        return familyTree;
    }

    /**
     * Sets the associated family tree for this family member.
     *
     * @param familyTree the associated {@link FamilyTree}
     */
    public void setFamilyTree(FamilyTree familyTree) {
        this.familyTree = familyTree;
    }

    /**
     * Returns a string representation of this FamilyMember.
     *
     * @return a string containing the family member details
     */
    @Override
    public String toString() {
        return "FamilyMember{" +
                "id=" + getId() +
                ", relationship='" + relationship + '\'' +
                ", person=" + (person != null ? person.getFirstName() + " " + person.getLastName() : "null") +
                ", parent=" + (parent != null ? parent.getId() : "null") +
                '}';
    }

    /**
     * Compares this FamilyMember to another object for equality.
     *
     * @param o the object to compare
     * @return true if the objects are equal, false otherwise
     */
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

    /**
     * Computes the hash code for this FamilyMember.
     *
     * @return the hash code as an integer
     */
    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), relationship, person, parent);
    }
}
