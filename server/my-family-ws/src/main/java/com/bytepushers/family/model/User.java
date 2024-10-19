package com.bytepushers.family.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String email;

    private String password;  // Store hashed passwords

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private List<Role> roles;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "user")
    private List<FamilyTree> familyTrees;


    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private List<FamilyMember> familyMembers;
    // Default constructor
    public User() {
    }

    public User(String email, String password, List<Role> roles, List<FamilyMember> familyMembers, FamilyTree familyTrees) {
        this.email = email;
        this.password = password;
        this.roles = roles;// will not be used for a while
        this.familyMembers = familyMembers;
        this.familyTrees = (List<FamilyTree>) familyTrees;
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

    public List<Role> getRoles(){
        return roles;
    }
    public void setRoles(List<Role> roles){
        this.roles = roles;
    }
    public List<FamilyMember> getFamilyMembers(){
        return familyMembers;
    }

    public void setFamilyMembers(List<FamilyMember> familyMembers){
        this.familyMembers = familyMembers;
    }
    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", roles=" + roles +
                ", familyMembers=" + familyMembers +
                '}';
    }

    public Object get() {
        return this;
    }
}