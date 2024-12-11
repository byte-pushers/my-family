package com.bytepushers.family.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

/**
 * Represents a family tree entity in the system.
 * This class models the hierarchical structure of a family tree, associating a root {@link Person}
 * and a list of related {@link FamilyMember}s.
 * <p>
 * Extends {@link BaseIdGeneratedValueEntity} to include common entity fields like ID and timestamps.
 * </p>
 */
@Entity
@Table(name = "family_tree_member")
public class FamilyTree extends BaseIdGeneratedValueEntity {

    /** The relationship description for the root of the family tree (e.g., Head of Family). */
    @Column(name = "relationship")
    private String relationship;

    /**
     * The primary person associated with this family tree.
     * Represents the root node or head of the family tree structure.
     */
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "person_id", referencedColumnName = "id")
    private Person person;

    /**
     * The list of family members associated with this family tree.
     * Models the recursive relationships within the family tree.
     */
    @OneToMany(mappedBy = "familyTree", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<FamilyMember> familyMembers = new ArrayList<>();

    /**
     * Default constructor for FamilyTree.
     * Required for frameworks like Hibernate to instantiate objects.
     */
    public FamilyTree() {
    }

    /**
     * Constructs a FamilyTree with a specified relationship and associated person.
     *
     * @param relationship the relationship type or description of the root person
     * @param person       the primary {@link Person} associated with this family tree
     */
    public FamilyTree(String relationship, Person person) {
        this.relationship = relationship;
        this.person = person;
    }

    /**
     * Retrieves the relationship description of the root of this family tree.
     *
     * @return the relationship description
     */
    public String getRelationship() {
        return relationship;
    }

    /**
     * Sets the relationship description of the root of this family tree.
     *
     * @param relationship the relationship description to set
     */
    public void setRelationship(String relationship) {
        this.relationship = relationship;
    }

    /**
     * Retrieves the primary {@link Person} associated with this family tree.
     *
     * @return the primary {@link Person}
     */
    public Person getPerson() {
        return person;
    }

    /**
     * Sets the primary {@link Person} associated with this family tree.
     *
     * @param person the primary {@link Person} to set
     */
    public void setPerson(Person person) {
        this.person = person;
    }

    /**
     * Retrieves the list of family members associated with this family tree.
     *
     * @return the list of {@link FamilyMember}s
     */
    public List<FamilyMember> getFamilyMembers() {
        return familyMembers;
    }

    /**
     * Sets the list of family members associated with this family tree.
     *
     * @param familyMembers the list of {@link FamilyMember}s to set
     */
    public void setFamilyMembers(List<FamilyMember> familyMembers) {
        this.familyMembers = familyMembers;
    }

    /**
     * Returns a string representation of this FamilyTree.
     * Includes details about the relationship, person, and family members.
     *
     * @return a string containing the family tree details
     */
    @Override
    public String toString() {
        return super.toString().replaceFirst("}$", "") +
                ", relationship='" + relationship + '\'' +
                ", person=" + person +
                ", familyMembers=" + familyMembers +
                '}';
    }
}
