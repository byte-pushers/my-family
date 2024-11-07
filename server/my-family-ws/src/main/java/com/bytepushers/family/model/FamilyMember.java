package com.bytepushers.family.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@Table(name = "family_members")
public class FamilyMember extends BaseEntity {

    @Enumerated(EnumType.STRING)
    @NotEmpty(message = "Relationship is required")
    private RelationshipType relationship;

    @ManyToOne
    @JoinColumn(name = "person_id")
    @JsonIgnoreProperties("familyMembers")  // Prevents circular serialization issues
    private Person person;

    // Recursive reference for child members
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_member_id")  // Use this to link child members
    private List<FamilyMember> familyMembers;

    public FamilyMember(Integer id, String createdBy, String updatedBy, LocalDateTime createdDate, LocalDateTime updatedDate) {
        super(id, createdBy, updatedBy, createdDate, updatedDate);
    }

    // Default constructor
    public FamilyMember() {
    }

    public FamilyMember(RelationshipType relationship, Person person) {
        this.relationship = relationship;
        this.person = person;
    }

    // Getters and Setters
    public RelationshipType getRelationship() {
        return relationship;
    }

    public void setRelationship(@NotEmpty(message = "Relationship is required") RelationshipType relationship) {
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
        return "FamilyMember{" +
                "id=" + getId() +
                ", relationship='" + relationship + '\'' +
                ", person=" + (person != null ? person.getFirstName() + " " + person.getLastName() : "null") +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof FamilyMember)) return false;
        if (!super.equals(o)) return false;

        FamilyMember that = (FamilyMember) o;
        return Objects.equals(relationship, that.relationship) &&
                Objects.equals(person, that.person);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), relationship, person);
    }
}
