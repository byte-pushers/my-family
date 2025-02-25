package com.bytepushers.family.security.model;

import com.bytepushers.family.model.BaseIdGeneratedValueEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;

import java.util.Collection;

@Entity
public class Privilege extends BaseIdGeneratedValueEntity {
    private String name;

    @ManyToMany(mappedBy = "privileges")
    private Collection<Role> roles;

    public Privilege() {

    }

    public Privilege(String name) {
        this.name = name;
    }

    public String getName() {
        return this.name;
    }
}
