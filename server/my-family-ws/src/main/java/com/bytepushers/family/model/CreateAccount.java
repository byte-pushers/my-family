package com.bytepushers.family.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.*;
import org.hibernate.mapping.Value;
import org.hibernate.validator.constraints.Length;

import java.time.LocalDate;

@Entity
public class CreateAccount {

    @Id
    @GeneratedValue
    private Integer Id;

    @Column(nullable = false)
    @NotBlank(message="First Name is Required")
    private String firstName;

    private String middleName;

    @Column(nullable = false)
    @NotBlank(message="Last Name is Required")
    private String lastName;

    private String nickName;

    @Column(nullable = false)
    @NotNull(message="Birth Day is Required")
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


    public CreateAccount() {
    }

    public CreateAccount(Integer Id, String firstName, String middleName, String lastName, String nickName, LocalDate birthday, int age, String password, String email, String address) {
        this.Id = Id;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.nickName = nickName;
        this.birthday = birthday;
        this.age = age;
        this.password = password;
        this.email = email;
        this.address = address;
    }

    public void setId(Integer Id) {
        this.Id = Id;
    }
    public Integer getId() {
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
        return "CreateAccount {" +
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
}
