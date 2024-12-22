package com.bytepushers.family.model;

import com.bytepushers.family.security.model.Role;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Collection;

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

    @ManyToMany(fetch = FetchType.LAZY)
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
        this.email = email;
        this.password = password;
        this.username = username;
        this.enabled = enabled;
        this.person = new Person();
    }

    // Getters and Setters

    /**
     * Returns the current User instance.
     *
     * @return The current User instance.
     */
    public Object get() {
        return this;
    }

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

    /**
     * Gets the associated {@link Person}.
     *
     * @return The associated {@link Person}.
     */
    public Person getPerson() {
        return this.person;
    }

    /**
     * Gets the roles associated with the user.
     *
     * @return A collection of {@link Role} objects.
     */
    public Collection<Role> getRoles() {
        return this.roles;
    }

    /**
     * Sets the roles for the user.
     *
     * @param roles The roles to associate with the user.
     */
    public void setRoles(Collection<Role> roles) {
        this.roles = roles;
    }

    /**
     * Sets the user's first name.
     *
     * @param firstName The first name to set.
     */
    public void setFirstName(String firstName) {
        this.person.setFirstName(firstName);
    }

    /**
     * Sets the user's last name.
     *
     * @param lastName The last name to set.
     */
    public void setLastName(String lastName) {
        this.person.setLastName(lastName);
    }

    /**
     * Sets the user's birthdate.
     *
     * @param birthDate The birthdate to set.
     */
    public void setBirthDate(LocalDate birthDate) {
        this.person.setBirthDate(birthDate);
    }

    /**
     * Gets the user's birthdate.
     *
     * @return The user's birthdate.
     */
    public LocalDate getBirthDate() {
        return this.person.getBirthDate();
    }

    /**
     * Sets the user's gender.
     *
     * @param gender The gender to set.
     */
    public void setGender(String gender) {
        this.person.setGender(gender);
    }

    /**
     * Gets the user's gender.
     *
     * @return The user's gender.
     */
    public String getGender() {
        return this.person.getGender();
    }

    // Overrides

    @Override
    public String toString() {
        return "User {" +
                "id=" + super.id +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", username='" + username + '\'' +
                ", enabled=" + enabled +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        User user = (User) o;

        if (!id.equals(user.id)) return false;
        if (!email.equals(user.email)) return false;
        if (!username.equals(user.username)) return false;
        if (!enabled.equals(user.enabled)) return false;

        return password.equals(user.password);
    }

    @Override
    public int hashCode() {
        int result = id.hashCode();
        result = 31 * result + email.hashCode();
        result = 31 * result + password.hashCode();
        result = 31 * result + username.hashCode();
        result = 31 * result + enabled.hashCode();
        return result;
    }
}
