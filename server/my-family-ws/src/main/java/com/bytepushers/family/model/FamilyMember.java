package com.bytepushers.family.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import java.util.List;

@Entity
@Table(name = "family_members")
public class FamilyMember extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @NotEmpty(message = "Relationship is required")
    private String relationship;

    @Embedded
    private Person person;

    // Parent reference for the bidirectional relationship
    @ManyToOne
    @JoinColumn(name = "parent_member_id")
    private FamilyMember parent;

    // Recursive reference for child members
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "parent")
    private List<FamilyMember> familyMembers;

    // Many-to-one relationship with FamilyTree (if needed)
    @ManyToOne
    @JoinColumn(name = "family_tree_id")
    private FamilyTree familyTree;

    // Default constructor
    public FamilyMember() {
    }

    public FamilyMember(Integer id, String relationship, Person person, List<FamilyMember> familyMembers, FamilyMember parent) {
        this.id = id;
        this.relationship = relationship;
        this.person = person;
        this.familyMembers = familyMembers;
        this.parent = parent;
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

    public List<FamilyMember> getFamilyMembers() {
        return familyMembers;
    }

    public void setFamilyMembers(List<FamilyMember> familyMembers) {
        this.familyMembers = familyMembers;
    }

    public FamilyMember getParent() {
        return parent;
    }

    public void setParent(FamilyMember parent) {
        this.parent = parent;
    }

    public FamilyTree getFamilyTree() {
        return familyTree;
    }

    public void setFamilyTree(FamilyTree familyTree) {
        this.familyTree = familyTree;
    }

    @Override
    public String toString() {
        return "FamilyMember{" +
                "id=" + id +
                ", relationship='" + relationship + '\'' +
                ", person=" + person +
                ", familyMembers=" + familyMembers +
                ", parent=" + (parent != null ? parent.getId() : "null") +
                '}';
    }
}
