package com.bytepushers.family.security.model;

import com.bytepushers.family.model.BaseIdGeneratedValueEntity;
import com.bytepushers.family.model.User;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;

import java.util.Collection;

@Entity
public class Role extends BaseIdGeneratedValueEntity {
    private String name;
    @ManyToMany(mappedBy = "roles")
    private Collection<User> users;

    @ManyToMany
    @JoinTable(
            name = "roles_privileges",
            joinColumns = @JoinColumn(
                    name = "role_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(
                    name = "privilege_id", referencedColumnName = "id"))
    private Collection<Privilege> privileges;

    public Role() {

    }
    public Role(String name, Collection<Privilege> privileges) {
        this.name = name;
        this.privileges = privileges;
    }

    public String getName() {
        return this.name;
    }

    public Collection<Privilege> getPrivileges() {
        return this.privileges;
    }
}