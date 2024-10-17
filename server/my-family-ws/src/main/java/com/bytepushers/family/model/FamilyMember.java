package com.bytepushers.family.model;

import jakarta.persistence.*;

@Entity
@Table(name = "family_members")
public class FamilyMember {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String relationship;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "person_id")
    private Person person;

    @ManyToOne
    @JoinColumn(name = "family_tree_id")
    private FamilyTree familyTree;

    // Default constructor
    public FamilyMember(){

    }

    public FamilyMember(Integer id, String relationship, Person person) {
        this.id = id;
        this.relationship = relationship;
        this.person = person;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getRelationship() {
        return relationship;
    }

    public void setRelationship(String relationship) {
        this.relationship = relationship;
    }

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    @Override
    public String toString() {
        return "FamilyMember{" +
                "id=" + id +
                ", relationship='" + relationship + '\'' +
                ", person=" + person +
                '}';
    }
}
