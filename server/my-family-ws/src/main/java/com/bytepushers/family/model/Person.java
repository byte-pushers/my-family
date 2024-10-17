package com.bytepushers.family.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "persons")
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "person_id")
    private List<FamilyMember> familyMembers;

    //Default constructor
    public Person(){

    }

    public Person(Integer id, List<FamilyMember> familyMembers) {
        this.id = id;
        this.familyMembers = familyMembers;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public List<FamilyMember> getFamilyMembers() {
        return familyMembers;
    }

    public void setFamilyMembers(List<FamilyMember> familyMembers) {
        this.familyMembers = familyMembers;
    }

    @Override
    public String toString() {
        return "Person{" +
                "id=" + id +
                ", familyMembers=" + familyMembers +
                '}';
    }
}
