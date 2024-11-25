package com.bytepushers.family.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/**
 * Represents a person entity in the system.
 * This class contains basic information about a person, such as their name, birth date, gender, and related family members.
 * It is associated with a {@link User} entity and extends {@link BaseModel} to include common metadata fields.
 */
@Entity
@Table(name = "Person")
public class Person extends BaseModel {

    /**
     * The unique identifier for the person entity.
     * Generated using a foreign key strategy linked to the associated {@link User}.
     */
    @Id
    @GeneratedValue(generator = "personKeyGenerator")
    @org.hibernate.annotations.GenericGenerator(
            name = "personKeyGenerator",
            strategy = "foreign",
            parameters = @org.hibernate.annotations.Parameter(name = "property", value = "user")
    )
    private Long id;

    /** The first name of the person. */
    @NotNull(message = "First name is required")
    @Column(name = "first_name")
    private String firstName;

    /** The last name of the person. */
    @NotNull(message = "Last name is required")
    @Column(name = "relationship")
    private String lastName;

    /** The birth date of the person in the format yyyy-MM-dd. */
    @Column(name = "birth_date")
    @JsonFormat(pattern = "yyyy-MM-dd")
    @NotNull(message = "Birth date is required")
    private LocalDate birthDate;

    /** The gender of the person (e.g., Male, Female, Non-Binary). */
    @Column(name = "gender")
    @NotNull(message = "Gender is required")
    private String gender;

    /**
     * The associated {@link User} entity for this person.
     * Represents the authentication or system user information tied to this person.
     */
    @OneToOne(optional = false)
    @PrimaryKeyJoinColumn
    private User user;

    /**
     * The list of family members associated with this person.
     * Models the bidirectional relationship between {@link Person} and {@link FamilyMember}.
     */
    @OneToMany(mappedBy = "person", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonBackReference
    private List<FamilyMember> familyMembers = new ArrayList<>();

    // Constructors

    /**
     * Default constructor for Person.
     * Required for frameworks like Hibernate to instantiate objects.
     */
    public Person() {
        super();
    }

    /**
     * Constructs a Person with basic details like name, birth date, and gender.
     *
     * @param firstName the first name of the person
     * @param lastName  the last name of the person
     * @param birthDate the birth date of the person
     * @param gender    the gender of the person
     */
    public Person(String firstName, String lastName, LocalDate birthDate, String gender) {
        super();
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.gender = gender;
    }

    /**
     * Constructs a Person with metadata, name, birth date, gender, and associated family members.
     *
     * @param id            the unique identifier of the person
     * @param createdBy     the username of the entity creator
     * @param updatedBy     the username of the last updater
     * @param createdDate   the timestamp when the entity was created
     * @param updatedDate   the timestamp when the entity was last updated
     * @param firstName     the first name of the person
     * @param lastName      the last name of the person
     * @param birthDate     the birth date of the person
     * @param gender        the gender of the person
     * @param familyMembers the list of {@link FamilyMember}s associated with this person
     */
    public Person(Long id, String createdBy, String updatedBy, LocalDateTime createdDate, LocalDateTime updatedDate,
                  String firstName, String lastName, LocalDate birthDate, String gender, List<FamilyMember> familyMembers) {
        super(createdBy, updatedBy, createdDate, updatedDate);
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.gender = gender;
        this.familyMembers = familyMembers;
    }

    // Getters and Setters

    /**
     * Gets the unique identifier of this person.
     *
     * @return the person's ID
     */
    public Long getId() {
        return id;
    }

    /**
     * Sets the unique identifier of this person.
     *
     * @param id the person's ID
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Gets the first name of this person.
     *
     * @return the first name
     */
    public String getFirstName() {
        return firstName;
    }

    /**
     * Sets the first name of this person.
     *
     * @param firstName the first name
     */
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    /**
     * Gets the last name of this person.
     *
     * @return the last name
     */
    public String getLastName() {
        return lastName;
    }

    /**
     * Sets the last name of this person.
     *
     * @param lastName the last name
     */
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    /**
     * Gets the birth date of this person.
     *
     * @return the birth date
     */
    public LocalDate getBirthDate() {
        return birthDate;
    }

    /**
     * Sets the birth date of this person.
     *
     * @param birthDate the birth date
     */
    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    /**
     * Gets the gender of this person.
     *
     * @return the gender
     */
    public String getGender() {
        return gender;
    }

    /**
     * Sets the gender of this person.
     *
     * @param gender the gender
     */
    public void setGender(String gender) {
        this.gender = gender;
    }

    /**
     * Gets the associated {@link User} of this person.
     *
     * @return the associated user
     */
    public User getUser() {
        return user;
    }

    /**
     * Sets the associated {@link User} for this person.
     *
     * @param user the associated user
     */
    public void setUser(User user) {
        this.user = user;
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
     * @param familyMembers the list of family members
     */
    public void setFamilyMembers(List<FamilyMember> familyMembers) {
        this.familyMembers = familyMembers;
    }

    // Overridden Methods

    /**
     * Returns a string representation of this person.
     *
     * @return a string containing the person's details
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
     * Compares this person to another object for equality.
     *
     * @param o the object to compare
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
     * Computes the hash code for this person.
     *
     * @return the hash code as an integer
     */
    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), firstName, lastName, birthDate, gender);
    }
}
