package com.bytepushers.family.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

/**
 * Represents a family tree entity in the system.
 * This class models the hierarchical structure of a family tree, associating a root {@link Person}
 * and a list of related {@link Person}s.
 * <p>
 * Extends {@link BaseIdGeneratedValueEntity} to include common entity fields like ID and timestamps.
 * </p>
 */
@Entity
@Table(name = "family_tree")
public class FamilyTree extends BaseModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @OneToMany(
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    private List<Person> people = new ArrayList<>();

    public FamilyTree() {

    }

    public FamilyTree(Builder builder) {
        super(builder.createdBy, builder.createdDate, builder.updatedBy, builder.updatedDate);
        this.id = builder.id;
        this.name = builder.name;
        this.people = builder.people;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public List<Person> getPeople() {
        return people;
    }

    public void setPeople(List<Person> people) {
        this.people = people;
    }

    public void addPerson(Person person) {
        this.people.add(person);
    }

    /**
     * Returns a string representation of this FamilyTree.
     * Includes details about the relationship, person, and family members.
     *
     * @return a string containing the family tree details
     */
    @Override
    public String toString() {
        return "FamilyTree {" +
            "id=" + id +
            "name='" + name + "'" +
            "people=" + people +
            super.toString() + "," +
        "}";
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        FamilyTree that = (FamilyTree) o;
        return Objects.equals(id, that.id) && Objects.equals(name, that.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), id, name);
    }

    public static class Builder {
        private Long id;
        private String name;
        private List<Person> people = new ArrayList<>();
        private String createdBy;
        private Date createdDate;
        private String updatedBy;
        private Date updatedDate;

        public Builder() {

        }

        public Builder id(Long id) {
            this.id = id;

            return this;
        }

        public Builder name(String name) {
            this.name = name;

            return this;
        }

        public Builder people(List<Person> people) {
            this.people = people;

            return this;
        }

        public Builder createdBy(String createdBy) {
            this.createdBy = createdBy;
            return this;
        }

        public Builder createdDate(Date createdDate) {
            this.createdDate = createdDate;
            return this;
        }

        public Builder addPerson(Person person) {
            this.people.add(person);
            return this;
        }

        public Builder withCreatedBy(String createdBy) {
            this.createdBy = createdBy;

            return this;
        }

        public Builder withCreatedDate(Date createdDate) {
            this.createdDate = createdDate;

            return this;
        }

        public Builder updatedBy(String updatedBy) {
            this.updatedBy = updatedBy;

            return this;
        }

        public Builder updatedDate(Date updatedDate) {
            this.updatedDate = updatedDate;

            return this;
        }

        public FamilyTree build() {
            return new FamilyTree(this);
        }
    }
}