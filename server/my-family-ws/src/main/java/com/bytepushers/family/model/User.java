package com.bytepushers.family.model;

import jakarta.persistence.*; // Ensure you're using the correct JPA annotations

@Entity
@Table(name = "users") // Add the table name if it differs from the entity name
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // This makes the id auto-increment
    private Long id;

    @Column(nullable = false, unique = true) // Ensure email is unique and not null
    private String email;

    @Column(nullable = false) // Ensure password is not null
    private String password;

    // Default constructor
    public User() {
    }

    // Parameterized constructor
    public User(String email, String password) {
        this.email = email;
        this.password = password;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                '}';
    }

    // Override equals and hashCode methods
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        User user = (User) o;

        if (!id.equals(user.id)) return false;
        if (!email.equals(user.email)) return false;
        return password.equals(user.password);
    }

    @Override
    public int hashCode() {
        int result = id.hashCode();
        result = 31 * result + email.hashCode();
        result = 31 * result + password.hashCode();
        return result;
    }
}