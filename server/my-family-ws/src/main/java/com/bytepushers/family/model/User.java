package com.bytepushers.family.model;

import com.bytepushers.family.security.model.Role;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Collection;

@Entity
@Table(name = "users")
public class User extends BaseIdGeneratedValueEntity {
    @Column(nullable = false, unique = true) // Ensure email is unique and not null
    private String email;

    @Column(nullable = false) // Ensure password is not null
    private String password;  // Store hashed passwords

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
            name = "users_roles",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id")
    )
    private Collection<Role> roles;

    // Default constructor
    public User() {
        super();
        this.person = new Person();
    }

    public User(String email, String password, String username, Boolean enabled) {
        this.email = email;
        this.password = password;
        this.username = username;
        this.enabled = enabled;

        this.person = new Person();
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Boolean getEnabled() {
        return enabled;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

    @Override
    public String toString() {
        return "User {" +
            "id=" + super.id +
            ", email='" + email + '\'' +
            ", password='" + password + '\'' +
            ", username='" + username + '\'' +
            ", enabled='" + enabled + '\'' +
        '}';
    }

    public Object get() {
        return this;
    }

    // Override equals and hashCode methods
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

    public void setBirthDate(LocalDate birthDate) {
        this.person.setBirthDate(birthDate);
    }

    public LocalDate getBirthDate() {
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
}