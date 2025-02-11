package com.bytepushers.family.model;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import java.time.LocalDate;
import java.util.Objects;

/**
 * The {@code Account} class represents a user account in the system.
 *
 * <p>This class is annotated with JPA and validation annotations to ensure
 * proper persistence and data integrity. Each field represents a piece of
 * user account information such as name, email, password, and other personal details.
 *
 * <p>The {@code Account} class includes validation rules such as non-null constraints,
 * size limitations, and specific formats (e.g., email validation) to guarantee the data's validity.
 *
 * <p>Author: Adish Timalsina</p>
 */
@Entity
public class Account {

    /** The unique identifier for the account. */
    @Id
    @GeneratedValue
    private Long Id;

    /** The first name of the account holder. Required and cannot be blank. */
    @Column(nullable = false)
    @NotBlank(message="First Name is Required")
    private String firstName;

    /** The middle name of the account holder. Optional. */
    private String middleName;

    /** The last name of the account holder. Required and cannot be blank. */
    @Column(nullable = false)
    @NotBlank(message="Last Name is Required")
    private String lastName;

    /** The username for the account. Must be unique and not blank. */
    @Column(nullable = false)
    @NotBlank(message = "User Name is Required")
    private String userName;

    /** The nickname of the account holder. Optional. */
    private String nickName;

    /** The birthday of the account holder. Required and must not be null. */
    @Column(nullable = false)
    @NotNull(message="Birthdate is required")
    private LocalDate birthday;

    /**
     * The age of the account holder. Required and must be within the range 0 to 140.
     */
    @Column(nullable = false)
    @NotNull(message="Age is Required")
    @Min(value=0, message = "Age can not be negative")
    @Max(value = 140, message = "Maximum Age limit is 140")
    private int age;

    /**
     * The password for the account. Required, must be at least 8 characters long.
     */
    @Column(nullable = false)
    @NotBlank(message="Password is Required")
    @Size(min=8, message = "Password should be at least 8 character long")
    private String password;

    /**
     * The email of the account holder. Required, unique, and must be a valid email format.
     */
    @Column(unique = true, nullable = false)
    @NotBlank(message="Email is Required")
    @Email(message = "Invalid Email")
    private String email;

    /** The address of the account holder. Required and cannot be blank. */
    //@Column(nullable = false)
    //@NotBlank(message="Address is Required")
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "address_id")
    private Address address;

    /**
     * Default constructor for JPA.
     */
    public Account() {
    }

    /**
     * Parameterized constructor for creating an Account object.
     *
     * @param Id         the unique identifier for the account.
     * @param firstName  the first name of the account holder.
     * @param middleName the middle name of the account holder (optional).
     * @param lastName   the last name of the account holder.
     * @param userName   the username for the account.
     * @param nickName   the nickname of the account holder (optional).
     * @param birthday   the birthday of the account holder.
     * @param age        the age of the account holder.
     * @param password   the password for the account.
     * @param email      the email of the account holder.
     * @param address    the address of the account holder.
     */
    public Account(Long Id, String firstName, String middleName, String lastName, String userName, String nickName, LocalDate birthday, int age, String password, String email, Address address) {
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

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    /**
     * Converts the Account object to a string representation.
     *
     * @return a string representation of the Account object.
     */
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

    /**
     * Checks if two Account objects are equal.
     *
     * @param o the object to compare with.
     * @return true if the objects are equal; false otherwise.
     */
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Account account = (Account) o;
        return age == account.age && Objects.equals(Id, account.Id) && Objects.equals(firstName, account.firstName) && Objects.equals(middleName, account.middleName) && Objects.equals(lastName, account.lastName) && Objects.equals(userName, account.userName) && Objects.equals(nickName, account.nickName) && Objects.equals(birthday, account.birthday) && Objects.equals(password, account.password) && Objects.equals(email, account.email) && Objects.equals(address, account.address);
    }

    /**
     * Generates the hash code for the Account object.
     *
     * @return the hash code of the Account object.
     */
    @Override
    public int hashCode() {
        return Objects.hash(Id, firstName, middleName, lastName, userName, nickName, birthday, age, password, email, address);
    }
}
