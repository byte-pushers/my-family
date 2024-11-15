package com.bytepushers.family.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.Date;
import java.util.Objects;

/**
 * Represents a family member entity in the system. This class contains information about
 * the family relationship type and the associated {@link Person} entity.
 * It extends the {@link BaseEntity} class to inherit common entity fields.
 * <p>
 * will have a person and relationship
 *
 */
@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@Table(name = "family_members")
public class FamilyMember extends BaseEntity {

    /** The type of relationship this family member has (e.g., Parent, Sibling). and the relationshipType is enum*/
    @Enumerated(EnumType.STRING)
    @NotNull(message = "Relationship is required")
    private RelationshipType relationship;

    /** The associated person entity for this family member. */
    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "person_id")
    @JsonIgnoreProperties("familyMembers")  // Prevents circular serialization issues
    @NotNull(message = "Person is required")
    private Person person;

    /**
     * Constructs a FamilyMember calling the super class which is {@link BaseEntity} .
     *
     * @param id           the unique identifier for the entity
     * @param createdBy    the username of the entity creator
     * @param updatedBy    the username of the last updater
     * @param createdDate  the date when the entity was created
     * @param updatedDate  the date when the entity was last updated
     */
    public FamilyMember(Integer id, String createdBy, String updatedBy, Date createdDate, Date updatedDate) {
        super(id, createdBy, updatedBy, createdDate, updatedDate);
    }

    /**
     * Default constructor for FamilyMember.
     */
    public FamilyMember() {
    }

    /**
     * Constructs a FamilyMember with specified relationship and person.
     *
     * @param relationship the type of relationship to the main person
     * @param person       the associated person entity
     */
    public FamilyMember(RelationshipType relationship, Person person) {
        this.relationship = relationship;
        this.person = person;
    }

    // Getters and Setters

    /**
     * Gets the relationship type of this family member.
     *
     * @return the relationship type
     */
    public RelationshipType getRelationship() {
        return relationship;
    }

    /**
     * Sets the relationship type for this family member.
     *
     * @param relationship the relationship type
     */
    public void setRelationship(@NotEmpty(message = "Relationship is required") RelationshipType relationship) {
        this.relationship = relationship;
    }

    /**
     * Gets the associated person entity for this family member.
     *
     * @return the associated person
     */
    public Person getPerson() {
        return person;
    }

    /**
     * Sets the associated person for this family member.
     *
     * @param person the person entity to associate
     */
    public void setPerson(Person person) {
        this.person = person;
    }

    /**
     * Returns a string representation of this FamilyMember.
     *
     * @return a string containing the family member details
     */
    @Override
    public String toString() {
        return "FamilyMember {" +
                super.toString() +
                ", relationship='" + relationship + '\'' +
                ", person=" + (person != null ? person.getFirstName() + " " + person.getLastName() : "null") +
                '}';
    }

    /**
     * Compares this FamilyMember to another object for equality.
     *
     * @param o the object to compare to
     * @return true if the objects are equal, false otherwise
     */
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof FamilyMember)) return false;
        if (!super.equals(o)) return false;

        FamilyMember that = (FamilyMember) o;
        return Objects.equals(relationship, that.relationship) &&
                Objects.equals(person, that.person);
    }

    /**
     * Computes the hash code for this FamilyMember.
     *
     * @return the hash code as an integer
     */
    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), relationship, person);
    }
}
