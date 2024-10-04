package com.bytepushers.family.model;

import jakarta.persistence.*;
import org.springframework.security.oauth2.core.oidc.OidcUserInfo;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;  // Store hashed passwords

    // Default constructor
    public User() {
    }

    public User(String email, String password) {
        this.email = email;
        this.password = password;
    }

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
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
        return "User {" +
            "id=" + id + ", " +
            "email=" + email + ", "  +
            "password=" + password +
        "}";
    }

    // TODO Override the equals and hashcode methods
}