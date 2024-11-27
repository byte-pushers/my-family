package com.bytepushers.family.model;

import com.bytepushers.family.security.model.Role;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Objects;

/**
 * Entity representing a system user.
 * <p>
 * This class models a user with details such as email, password, username, roles, and
 * associated {@link Person} information. It serves as the primary entity for user management.
 * </p>
 *
 * <p>
 * Key features:
 * <ul>
 *   <li>Stores essential user details like email, password, and username.</li>
 *   <li>Manages relationships with {@link Person} and {@link Role} entities.</li>
 *   <li>Implements unique constraints on email and username.</li>
 * </ul>
 * </p>
 *
 * @author Danny Amezquita
 * @version 1.0
 */
@Entity
@Table(name = "users")
public class User extends BaseIdGeneratedValueEntity {
    @Column(nullable = false, unique = true) // Ensure email is unique and not null
    private String email;

    @Column(nullable = false) // Ensure the password is not null
    private String password; // Store hashed passwords

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private Boolean enabled;

    @Column(nullable = true)
    private Boolean tokenExpired;

    @OneToOne(mappedBy = "user", cascade = CascadeType.PERSIST)
    private Person person;

    @ManyToMany
    @JoinTable(
            name = "users_family_tree",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "family_tree_id", referencedColumnName = "id")
    )
    private Collection<FamilyTree> familyTrees;

    @ManyToMany
    @JoinTable(
            name = "users_roles",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id")
    )
    private Collection<Role> roles;

    // Constructors

    /**
     * Default constructor for creating an empty User instance.
     * Initializes the associated {@link Person} object.
     */
    public User() {
        super();
        this.person = new Person();
        person.setUser(this);
    }
    public User(Long id, String email, String password, String username, Boolean enabled, String createdBy, Date createdDate, String updatedBy, Date updatedDate) {
        super(id, createdBy, createdDate, updatedBy, updatedDate);

        this.email = email;
        this.password = password;
        this.username = username;
        this.enabled = enabled;
        this.person = new Person();
        person.setUser(this);
    }

    /**
     * Constructs a User with essential details.
     *
     * @param email    The email address of the user (must be unique).
     * @param password The hashed password of the user.
     * @param username The username of the user.
     * @param enabled  Indicates whether the user account is enabled.
     */
    public User(String email, String password, String username, Boolean enabled) {
        super();
        this.email = email;
        this.password = password;
        this.username = username;
        this.enabled = enabled;
        this.person = new Person();
        person.setUser(this);
    }

    // Getters and Setters
    /**
     * Gets the email of the user.
     *
     * @return The user's email.
     */
    public String getEmail() {
        return email;
    }

    /**
     * Sets the email of the user.
     *
     * @param email The email to set.
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * Gets the hashed password of the user.
     *
     * @return The user's password.
     */
    public String getPassword() {
        return password;
    }

    /**
     * Sets the hashed password of the user.
     *
     * @param password The password to set.
     */
    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * Gets the username of the user.
     *
     * @return The user's username.
     */
    public String getUsername() {
        return this.username;
    }

    /**
     * Sets the username of the user.
     *
     * @param username The username to set.
     */
    public void setUsername(String username) {
        this.username = username;
    }

    /**
     * Gets the enabled status of the user.
     *
     * @return {@code true} if the user is enabled, {@code false} otherwise.
     */
    public Boolean getEnabled() {
        return enabled;
    }

    /**
     * Sets the enabled status of the user.
     *
     * @param enabled The enabled status to set.
     */
    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

    /*@Override
    public String toString() {
        return "User {" +
            "id=" + super.id +
            ", email='" + email + '\'' +
            ", password='" + password + '\'' +
            ", username='" + username + '\'' +
            ", enabled='" + enabled + '\'' +
            super.toString() +
        '}';
    }*/

    public Object get() {
        return this;
    }

    public void setFirstName(String firstName) {
        this.person.setFirstName(firstName);
    }

    public void setLastName(String lastName) {
        this.person.setLastName(lastName);
    }

    public Collection<Role> getRoles() {
        return this.roles;
    }

    public void setRoles(Collection<Role> roles) {
        this.roles = roles;
    }

    public void setBirthDate(Date birthDate) {
        this.person.setBirthDate(birthDate);
    }

    public Date getBirthDate() {
        return this.person.getBirthDate();
    }

    public void setGender(String gender) {
        this.person.setGender(gender);
    }

    public String getGender() {
        return this.person.getGender();
    }

    public Person getPerson() {
        return this.person;
    }

    public void setPerson(Person person) {
        this.person = person;
        person.setUser(this);
    }

    public Collection<FamilyTree> getFamilyTrees() {
        return this.familyTrees;
    }

    public void setFamilyTrees(Collection<FamilyTree> familyTrees) {
        this.familyTrees = familyTrees;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        User user = (User) o;
        return Objects.equals(id, user.id) && Objects.equals(email, user.email) && Objects.equals(password, user.password) && Objects.equals(username, user.username) && Objects.equals(enabled, user.enabled) && Objects.equals(tokenExpired, user.tokenExpired) && Objects.equals(person, user.person) && Objects.equals(familyTrees, user.familyTrees) && Objects.equals(roles, user.roles);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), id, email, password, username, enabled, tokenExpired, person, familyTrees, roles);
    }
}