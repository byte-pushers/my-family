package com.bytepushers.family.model;

import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotEmpty;
import java.time.LocalDate; // Use LocalDate instead of String
import java.util.Objects;

@Embeddable
public class Person {

    @NotEmpty(message = "First name is required")
    private String firstName;

    @NotEmpty(message = "Last name is required")
    private String lastName;

    @NotEmpty(message = "Birth date is required")
    private LocalDate birthDate; // Change to LocalDate

    @NotEmpty(message = "Gender is required")
    private String gender;

    // Default constructor
    public Person(String john, String doe, String date, String male) {
    }

    public Person(String firstName, String lastName, LocalDate birthDate, String gender) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate; // Adjusted
        this.gender = gender;
    }

    // Getters and Setters
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

    public LocalDate getBirthDate() { // Adjusted return type
        return birthDate;
    }

    public void setBirthDate(LocalDate birthDate) { // Adjusted parameter type
        this.birthDate = birthDate;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    @Override
    public String toString() {
        return "Person{" +
                "firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", birthDate=" + birthDate + // Adjusted
                ", gender='" + gender + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Person)) return false;
        Person person = (Person) o;
        return firstName.equals(person.firstName) &&
                lastName.equals(person.lastName) &&
                birthDate.equals(person.birthDate) && // Include comparison for birthDate
                gender.equals(person.gender);
    }

    @Override
    public int hashCode() {
        return Objects.hash(firstName, lastName, birthDate, gender); // Use fields in hashCode
    }
}
