package com.bytepushers.family.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

/**
 * Represents a person entity in the system. This class contains personal details
 * such as first name, last name, birth date, and gender. It extends {@link BaseEntity}
 * to inherit common fields and establishes a one-to-many relationship with {@link FamilyMember}.
 */
@Entity
@Table(name = "Person")
public class Person extends BaseEntity {

    /** The first name of the person. Must not be null. */
    @NotNull(message = "First name is required")
    private String firstName;

    /** The last name of the person. Must not be null. */
    @NotNull(message = "Last name is required")
    private String lastName;

    /** The birth date of the person. Must not be null. */
    @NotNull(message = "Birth date is required")
    private Date birthDate;

    /** The gender of the person. Must not be null. */
    @NotNull(message = "Gender is required")
    private String gender;

    /**
     * A list of family members associated with this person.
     * This relationship is managed with a one-to-many association.
     */
    @OneToMany(mappedBy = "person", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnoreProperties("person") // Avoids circular references during serialization
    private List<FamilyMember> familyMembers = new ArrayList<>();

    // Constructors

    /**
     * Default constructor for Person.
     */
    public Person() {
    }

    /**
     * Constructs a Person with specified first name, last name, birth date, and gender.
     *
     * @param firstName  the first name of the person
     * @param lastName   the last name of the person
     * @param birthDate  the birth date of the person
     * @param gender     the gender of the person
     */
    public Person(String firstName, String lastName, Date birthDate, String gender) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.gender = gender;
    }

    /**
     * Constructs a Person with all details, including inherited fields and a list of family members.
     *
     * @param id             the unique identifier for the entity
     * @param createdBy      the username of the entity creator
     * @param updatedBy      the username of the last updater
     * @param createdDate    the date when the entity was created
     * @param updatedDate    the date when the entity was last updated
     * @param firstName      the first name of the person
     * @param lastName       the last name of the person
     * @param birthDate      the birth date of the person
     * @param gender         the gender of the person
     * @param familyMembers  a list of family members associated with this person
     */
    public Person(Integer id, String createdBy, String updatedBy, Date createdDate, Date updatedDate, String firstName, String lastName, Date birthDate, String gender, List<FamilyMember> familyMembers) {
        super(id, createdBy, updatedBy, createdDate, updatedDate);
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.gender = gender;
        this.familyMembers = familyMembers;
    }

    // Getters and Setters

    /**
     * Gets the first name of the person.
     *
     * @return the first name
     */
    public String getFirstName() {
        return firstName;
    }

    /**
     * Sets the first name of the person.
     *
     * @param firstName the first name to set
     */
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    /**
     * Gets the last name of the person.
     *
     * @return the last name
     */
    public String getLastName() {
        return lastName;
    }

    /**
     * Sets the last name of the person.
     *
     * @param lastName the last name to set
     */
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    /**
     * Gets the birth date of the person.
     *
     * @return the birth date
     */
    public Date getBirthDate() {
        return birthDate;
    }

    /**
     * Sets the birth date of the person.
     *
     * @param birthDate the birth date to set
     */
    public void setBirthDate(Date birthDate) {
        this.birthDate = birthDate;
    }

    /**
     * Gets the gender of the person.
     *
     * @return the gender
     */
    public String getGender() {
        return gender;
    }

    /**
     * Sets the gender of the person.
     *
     * @param gender the gender to set
     */
    public void setGender(String gender) {
        this.gender = gender;
    }

    /**
     * Gets the list of family members associated with this person.
     *
     * @return the list of family members
     */
    public List<FamilyMember> getFamilyMembers() {
        return familyMembers;
    }

    /**
     * Sets the list of family members associated with this person.
     *
     * @param familyMembers the list of family members to set
     */
    public void setFamilyMembers(List<FamilyMember> familyMembers) {
        this.familyMembers = familyMembers;
    }

    /**
     * Returns a string representation of this Person.
     *
     * @return a string containing person details
     */
    @Override
    public String toString() {
        return "Person{" +
                super.toString() +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", birthDate=" + birthDate +
                ", gender='" + gender + '\'' +
                '}';
    }

    /**
     * Compares this Person to another object for equality.
     *
     * @param o the object to compare to
     * @return true if the objects are equal, false otherwise
     */
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Person)) return false;
        if (!super.equals(o)) return false;

        Person person = (Person) o;
        return firstName.equals(person.firstName) &&
                lastName.equals(person.lastName) &&
                birthDate.equals(person.birthDate) &&
                gender.equals(person.gender);
    }

    /**
     * Computes the hash code for this Person.
     *
     * @return the hash code as an integer
     */
    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), firstName, lastName, birthDate, gender);
    }
}
