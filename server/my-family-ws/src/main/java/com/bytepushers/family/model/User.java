package com.bytepushers.family.model;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true) // Ensure email is unique and not null
    private String email;

    @Column(nullable = false) // Ensure password is not null
    private String password;  // Store hashed passwords

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private Boolean enabled;

    // Default constructor
    public User() {
    }

    public User(String email, String password, String username, Boolean enabled) {
        this.email = email;
        this.password = password;
        this.username = username;
        this.enabled = enabled;
    }

    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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
            "id=" + id +
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
}