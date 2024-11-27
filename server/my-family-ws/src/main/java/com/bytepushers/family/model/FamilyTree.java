package com.bytepushers.family.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "family_tree_member")
public class FamilyTree extends BaseIdGeneratedValueEntity {



    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "relationship")
    private String relationship;

    //
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "person_id", referencedColumnName = "id")
    private Person person;

    @OneToMany(mappedBy = "familyTree", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<FamilyMember> familyMembers = new ArrayList<>();

    // Constructors
    public FamilyTree() {
    }

    public FamilyTree(String relationship, Person person) {
        this.relationship = relationship;
        this.person = person;
    }

    // Getters and Setters
    @Override
    public Long getId() {
        return id;
    }

    public void setId(long id) {
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

    public List<FamilyMember> getFamilyMembers() {
        return familyMembers;
    }

    public void setFamilyMembers(List<FamilyMember> familyMembers) {
        this.familyMembers = familyMembers;
    }

    @Override
    public String toString() {
        return super.toString().replaceFirst("}$", "") +
                ", relationship='" + relationship + '\'' +
                ", person=" + person +
                ", familyMembers=" + familyMembers +
                '}';
    }
}