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

@Entity
@Table(name = "Person")
public class Person extends BaseModel {
    @Id
    @GeneratedValue(generator = "personKeyGenerator")
    @org.hibernate.annotations.GenericGenerator(
            name = "personKeyGenerator",
            strategy = "foreign",
            parameters = @org.hibernate.annotations.Parameter(name = "property", value = "user")
    )
    private Long id;

    @NotNull(message = "First name is required")
    @Column(name = "first_name")
    private String firstName;

    @Column(name = "relationship")
    @NotNull(message = "Last name is required")
    private String lastName;

    @Column(name = "birth_date")
    @JsonFormat(pattern = "yyyy-MM-dd")
    @NotNull(message = "Birth date is required")
    private LocalDate birthDate;

    @Column(name = "gender")
    @NotNull(message = "Gender is required")
    private String gender;

    @OneToOne(optional = false)
    @PrimaryKeyJoinColumn
    private User user;

    // One-to-Many relationship with FamilyMember (if needed)
    @OneToMany(mappedBy = "person", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonBackReference
    private List<FamilyMember> familyMembers = new ArrayList<>();

    // Constructors
    public Person() {
        super();
    }

    public Person(String firstName, String lastName, LocalDate birthDate, String gender) {
        super();
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.gender = gender;
    }

    public Person(Long id, String createdBy, String updatedBy, LocalDateTime createdDate, LocalDateTime updatedDate, String firstName, String lastName, LocalDate birthDate, String gender, List<FamilyMember> familyMembers) {
        super(createdBy, updatedBy, createdDate, updatedDate);
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.gender = gender;
        this.familyMembers = familyMembers;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public List<FamilyMember> getFamilyMembers() {
        return familyMembers;
    }

    public void setFamilyMembers(List<FamilyMember> familyMembers) {
        this.familyMembers = familyMembers;
    }

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


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Person)) return false;
        if (!super.equals(o)) return false;  // Call to BaseIdGeneratedValueEntity's equals()

        Person person = (Person) o;
        return firstName.equals(person.firstName) &&
                lastName.equals(person.lastName) &&
                birthDate.equals(person.birthDate) &&
                gender.equals(person.gender);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), firstName, lastName, birthDate, gender);  // Include both BaseIdGeneratedValueEntity and Person fields
    }

    public void setUser(User user) {
        this.user = user;
    }
}