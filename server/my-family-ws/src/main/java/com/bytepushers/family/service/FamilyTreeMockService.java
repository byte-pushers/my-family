package com.bytepushers.family.service;

import com.bytepushers.family.model.FamilyTree;
import com.bytepushers.family.model.FamilyMember;
import com.bytepushers.family.model.Person;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@Qualifier("familyTreeMockService") // Ensure this matches your controller's qualifier
public abstract class FamilyTreeMockService implements FamilyTreeService {

    private List<FamilyTree> familyTrees;

    public FamilyTreeMockService() {
        familyTrees = new ArrayList<>();
        initData(); // Method to initialize mock data
    }

    private void initData() {
        // Create sample family members
        FamilyMember johnDoe = new FamilyMember();
        johnDoe.setRelationship("Father");
        johnDoe.setPerson(new Person("John", "Doe", "1970-01-01", "Male"));

        FamilyMember mikeDoe = new FamilyMember();
        mikeDoe.setRelationship("Son");
        mikeDoe.setPerson(new Person("Mike", "Doe", "2000-05-12", "Male"));

        FamilyMember annaDoe = new FamilyMember();
        annaDoe.setRelationship("Daughter");
        annaDoe.setPerson(new Person("Anna", "Doe", "2005-08-20", "Female"));

        FamilyMember emilySmith = new FamilyMember();
        emilySmith.setRelationship("Child");
        emilySmith.setPerson(new Person("Emily", "Smith", "2023-03-15", "Female"));

        // Link family members
        johnDoe.setFamilyMembers(List.of(mikeDoe, annaDoe));
        annaDoe.setFamilyMembers(List.of(emilySmith));

        // Create a family tree and add it to the list
        FamilyTree familyTree = new FamilyTree();
        familyTree.setId(1L); // Assuming this is the user ID
        familyTree.setFamilyMembers(List.of(johnDoe));
        familyTree.setParentType("Nuclear");
        familyTree.setParentName("Smith Family");
        familyTree.setGrandParentType("Extended");
        familyTree.setGrandParentName("Doe Family");
        familyTree.setCreatedBy("adminUser");
        familyTree.setUpdatedBy("adminUser");
        familyTree.setCreatedDate(LocalDateTime.now());
        familyTree.setUpdatedDate(LocalDateTime.now());

        familyTrees.add(familyTree);
    }

    @Override
    public FamilyTree updateFamilyTree(FamilyTree familyTree, long id) {
        // Simulate updating the family tree (for now just return the mock data)
        return familyTrees.get(0); // Return the first family tree for simplicity
    }

    // Implement other methods (e.g., getFamilyTrees) as needed
}
