package com.bytepushers.family.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "CivilUnion")
public class Union {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    /*@ManyToOne(cascade = CascadeType.ALL)  // Add cascade
    @JoinColumn(name = "person_id")
    private Person person;*/

    private Boolean married;

    @ManyToOne(cascade= CascadeType.ALL)
    private Person spouse;

    @OneToMany(cascade=CascadeType.ALL)
    private List<Person> children;

    public Union() {}

    public Union(UnionBuilder builder) {
        this.spouse = builder.spouse;
        this.married = builder.married;
        this.children = builder.children;
    }

    @Override
    public String toString() {
        return "Union {" +
            "id=" + id +
            ", spouse=" + spouse +
            ", married=" + married +
            ", children=" + children +
        '}';
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Person getSpouse() {
        return spouse;
    }

    public void setSpouse(Person spouse) {
        this.spouse = spouse;
    }

    public Boolean getMarried() {
        return married;
    }

    public void setMarried(Boolean married) {
        this.married = married;
    }

    public List<Person> getChildren() {
        return children;
    }

    public void setChildren(List<Person> children) {
        this.children = children;
    }

    public void addChild(Person child) {
        this.children.add(child);
    }

    public static class UnionBuilder {
        private Person spouse;
        private Boolean married;
        private List<Person> children = new ArrayList<>();

        public UnionBuilder unitedWith(Person spouse, Boolean married) {
            this.spouse = spouse;
            this.married = married;
            return this;
        }

        public UnionBuilder withChild(Person person) {
            this.children.add(person);
            return this;
        }
        public Union build() {
            return new Union(this);
        }
    }
}
