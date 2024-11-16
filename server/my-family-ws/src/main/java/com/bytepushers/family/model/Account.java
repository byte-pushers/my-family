package com.bytepushers.family.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.*;

import java.time.LocalDate;
import java.util.Objects;

@Entity
public class Account {

    @Id
    @GeneratedValue
    private Long Id;

    @Column(nullable = false)
    @NotBlank(message="First Name is Required")
    private String firstName;

    private String middleName;

    @Column(nullable = false)
    @NotBlank(message="Last Name is Required")
    private String lastName;

    @Column(nullable = false)
    @NotBlank(message = "User Name is Required")
    private String userName;

    private String nickName;

    @Column(nullable = false)
    @NotNull(message="Birthdate is required")
    private LocalDate birthday;

    @Column(nullable = false)
    @NotNull(message="Age is Required")
    @Min(value=0, message = "Age can not be negative")
    @Max(value = 140, message = "Maximum Age limit is 140")
    private int age;

    @Column(nullable = false)
    @NotBlank(message="Password is Required")
    @Size(min=8, message = "Password should be at least 8 character long")
    private String password;

    @Column(unique = true, nullable = false)
    @NotBlank(message="Email is Required")
    @Email(message = "Invalid Email")
    private String email;

    @Column(nullable = false)
    @NotBlank(message="Address is Required")
    private String address;


    public Account() {
    }

    public Account(Long Id, String firstName, String middleName, String lastName, String userName, String nickName, LocalDate birthday, int age, String password, String email, String address) {
        this.Id = Id;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.userName = userName;
        this.nickName = nickName;
        this.birthday = birthday;
        this.age = age;
        this.password = password;
        this.email = email;
        this.address = address;
    }

    public Long getId() {
        return Id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getMiddleName() {
        return middleName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserName() {
        return userName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    public LocalDate getBirthday() {
        return birthday;
    }

    public void setBirthday(LocalDate birthday) {
        this.birthday = birthday;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    @Override
    public String toString() {
        return "Account {" +
                "firstName='" + firstName + '\'' +
                ", middleName='" + middleName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", nickName='" + nickName + '\'' +
                ", birthday=" + birthday +
                ", age=" + age +
                ", email='" + email + '\'' +
                ", address='" + address + '\'' +
                '}';
    }


    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Account account = (Account) o;
        return age == account.age && Objects.equals(Id, account.Id) && Objects.equals(firstName, account.firstName) && Objects.equals(middleName, account.middleName) && Objects.equals(lastName, account.lastName) && Objects.equals(userName, account.userName) && Objects.equals(nickName, account.nickName) && Objects.equals(birthday, account.birthday) && Objects.equals(password, account.password) && Objects.equals(email, account.email) && Objects.equals(address, account.address);
    }

    @Override
    public int hashCode() {
        return Objects.hash(Id, firstName, middleName, lastName, userName, nickName, birthday, age, password, email, address);
    }
}
