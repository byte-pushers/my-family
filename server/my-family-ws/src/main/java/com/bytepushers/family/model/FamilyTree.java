package com.bytepushers.family.model;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table( name = "FamilyTreeMember")
public class FamilyTree extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    String relationship;
    @Embedded
    Person person;



    @OneToMany(mappedBy = "familyTree", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<FamilyMember> familyMembers = new ArrayList<>();

    public FamilyTree() {

    }

    public FamilyTree(String relationship, Person person) {
        this.relationship = relationship;
        this.person = person;
    }

    @Override
    public String toString() {
        return "FamilyTree{" +
            "relationshiop'" + this.relationship + '\'' +
            ", person='" + this.person + '\'' +
        '}';
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return this.id;
    }
    public List<FamilyMember> getFamilyMembers() {
        return familyMembers;
    }

    public void setFamilyMembers(List<FamilyMember> familyMembers) {
        this.familyMembers = familyMembers;
    }
}
