package com.bytepushers.family.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "CivilUnion")
public class Union extends BaseModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    /*@ManyToOne(cascade = CascadeType.ALL)  // Add cascade
    @JoinColumn(name = "person_id")
    private Person person;*/

    private Boolean married;

    @ManyToOne(cascade= CascadeType.ALL)
    private Person spouse;

    @OneToMany(cascade=CascadeType.ALL)
    private List<Person> children;

    public Union() {}

    public Union(Builder builder) {
        super(builder.createdBy, builder.createdDate, builder.updatedBy, builder.updatedDate);
        this.id = builder.id;
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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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

    public static class Builder {
        private Long id;
        private Person spouse;
        private Boolean married = false;
        private List<Person> children = new ArrayList<>();
        private String createdBy;
        private Date createdDate;
        private String updatedBy;
        private Date updatedDate;
        
        public Builder withId(Long id) {
            this.id = id;

            return this;
        }

        public Builder unitedWith(Person spouse, Boolean married) {
            this.spouse = spouse;
            this.married = married;

            return this;
        }

        public Builder withChild(Person person) {
            this.children.add(person);

            return this;
        }

        public Builder withChildren(List<Person> children) {
            this.children = children;

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

        public Builder withUpdatedBy(String updatedBy) {
            this.updatedBy = updatedBy;

            return this;
        }

        public Builder withUpdatedDate(Date updatedDate) {
            this.updatedDate = updatedDate;

            return this;
        }

        public Union build() {
            return new Union(this);
        }
    }
}
