package com.bytepushers.family.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

/**
 * Represents a person entity in the system.
 * This class contains basic information about a person, such as their name, birth date, gender, and related family members.
 * It is associated with a {@link User} entity and extends {@link BaseModel} to include common metadata fields.
 */
@Entity
@Table(name = "People")
public class Person extends BaseModel {

    /**
     * The unique identifier for the person entity.
     * Generated using a foreign key strategy linked to the associated {@link User}.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** The first name of the person. */
    @NotNull(message = "First name is required")
    @Column(name = "first_name")
    private String firstName;

    @Column(name = "middle_name")
    private String middleName;

    /** The last name of the person. */
    @Column(name = "last_name")
    @NotNull(message = "Last name is required")
    private String lastName;

    /** The birth date of the person in the format yyyy-MM-dd. */
    @Column(name = "birth_date")
    @JsonFormat(pattern = "yyyy-MM-dd")
    @NotNull(message = "Birth date is required")
    private Date birthDate;

    /** The gender of the person (e.g., Male, Female, Non-Binary). */
    @Column(name = "gender")
    @NotNull(message = "Gender is required")
    private String gender;

    @OneToMany(cascade=CascadeType.ALL)
    private List<Union> unions;

    @OneToMany(cascade=CascadeType.ALL)
    private List<Person> siblings;

    @ManyToMany(cascade=CascadeType.ALL)
    private List<Person> parents;

    @ManyToMany(mappedBy = "parents")
    private Set<Person> children = new HashSet<>();

    @OneToOne(fetch = FetchType.LAZY)
    @JoinTable(name = "USER_PERSON",
            joinColumns=@JoinColumn(name = "PERSON_ID"),
    inverseJoinColumns = @JoinColumn(name = "USER_ID", nullable = false, unique = true))
    private User user;

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
    public Person(String firstName, String lastName, Date birthDate, String gender) {
        super();
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.gender = gender;
    }

    /**
     * Constructs a Person with metadata, name, birth date, gender, and associated family members.
     *
     * @param createdBy     the username of the entity creator
     * @param firstName     the first name of the person
     * @param lastName      the last name of the person
     * @param birthDate     the birth date of the person
     * @param gender        the gender of the person
     */
    public Person(String firstName, String middleName, String lastName, Date birthDate, String gender, String createdBy) {
        super(createdBy, new Date(), null, null);
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.gender = gender;
    }

    public Person(PersonBuilder builder) {
        this.firstName = builder.build().firstName;
        this.lastName = builder.lastName;
        this.middleName = builder.build().middleName;
        this.birthDate = builder.birthDate;
        this.gender = builder.gender;
        this.unions = builder.unions;
    }

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

    public String getMiddleName() {
        return middleName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
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
    public Date getBirthDate() {
        return birthDate;
    }

    /**
     * Sets the birth date of this person.
     *
     * @param birthDate the birth date
     */
    public void setBirthDate(Date birthDate) {
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

    public List<Union> getUnions() {
        return unions;
    }

    public void setUnions(List<Union> unions) {
        this.unions = unions;
    }

    public void addUnion(Union union) {
        this.unions.add(union);
    }

    public List<Person> getParents() {
        return parents;
    }

    public void setParents(List<Person> parents) {
        this.parents = parents;
    }

    public void addParents(Person parent1, Person parent2) {
        if (!this.parents.isEmpty()) {
            throw new IllegalArgumentException();
        }

        this.parents.add(parent1);
        parent1.getChildren().add(this);
        this.parents.add(parent2);
        parent2.getChildren().add(this);
    }

    public Set<Person> getChildren() {
        return children;
    }

    public void setChildren(Set<Person> children) {
        this.children = children;
    }

    public Person createChild(String firstName, String middleName, String lastName, Date birthDate, String gender, String createdBy, Person parent2) {
        Person child = new Person(firstName, middleName, lastName, birthDate, gender, createdBy);
        this.children.add(child);
        child.getParents().add(this);

        if (parent2 != null) {
            parent2.getChildren().add(child);
            child.getParents().add(parent2);
        }

        return child;
    }

    public List<Person> getSiblings() {
        return siblings;
    }

    public void setSiblings(List<Person> siblings) {
        this.siblings = siblings;
    }

    // Overridden Methods

    /**
     * Returns a string representation of this person.
     *
     * @return a string containing the person's details
     */
    @Override
    public String toString() {
        return "Person {" +
            "id=" + id + "'," +
            "firstName='" + firstName + "'," +
            "lastName='" + lastName + "'," +
            "birthDate=" + birthDate +
            "gender='" + gender + "'," +
            "unions=" + unions + "," +
            "siblings=" + siblings + "," +
            "parents=" + parents + "," +
            super.toString() +
        "}";
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

    public void setUser(User user) {
        this.user = user;
    }

    public static class PersonBuilder {
        private String firstName;
        private String lastName;
        private Date birthDate;
        private String gender;
        private List<Union> unions = new ArrayList<>();

        public PersonBuilder(String firstName, String lastName) {
            this.firstName = firstName;
            this.lastName = lastName;
        }

        public PersonBuilder withBirthDate(Date birthDate) {
            this.birthDate = birthDate;
            return this;
        }

        public PersonBuilder withGender(String gender) {
            this.gender = gender;
            return this;
        }

        public PersonBuilder withUnion(Union union) {
            this.unions.add(union);
            return this;
        }

        public Person build() {
            return new Person(this);
        }
    }
}