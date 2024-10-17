package com.bytepushers.family.FamilyTreeTest.Repository;

import com.bytepushers.family.repo.FamilyTreeRepository;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;
import com.bytepushers.family.model.FamilyTree;
import java.util.List;
import java.util.Optional;
import static org.assertj.core.api.Assertions.assertThat;

@Disabled
@DataJpaTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class FamilyTreeRepositoryUnitTests {

    @Autowired
    private FamilyTreeRepository familyTreeRepository;

    @Test
    @DisplayName("Test 1: Save FamilyTree Test")
    @Order(1)
    @Rollback(value = false)
    public void saveFamilyTreeTest(){
        // Action
        FamilyTree familyTree = new FamilyTree();
        familyTree.setParentName("John");
        familyTree.setParentType("Father");
        familyTree.setGrandParentName("James");
        familyTree.setGrandParentType("Grandfather");

        familyTreeRepository.save(familyTree);

        // Verify
        System.out.println(familyTree);
        assertThat(familyTree.getId()).isGreaterThan(0);
    }

    @Test
    @Order(2)
    public void getFamilyTreeTest(){
        // Action
        FamilyTree familyTree = familyTreeRepository.findById(1L).get();

        // Verify
        System.out.println(familyTree);
        assertThat(familyTree.getId()).isEqualTo(1L);
    }

    @Test
    @Order(3)
    public void getListOfFamilyTreeTest(){
        // Action
        List<FamilyTree> familyTrees = familyTreeRepository.findAll();

        // Verify
        System.out.println(familyTrees);
        assertThat(familyTrees.size()).isGreaterThan(0);
    }

    @Test
    @Order(4)
    @Rollback(value = false)
    public void updateEmployeeTest(){
        // Action
        FamilyTree familyTree = familyTreeRepository.findById(1L).get();
        familyTree.setParentName("NewParentName");
        FamilyTree familyTreeUpdated = familyTreeRepository.save(familyTree);

        // Verify
        System.out.println(familyTreeUpdated);
        assertThat(familyTreeUpdated.getParentName()).isEqualTo("NewParentName");
    }

    @Test
    @Order(5)
    @Rollback(value = false)
    public void deleteFamilyTreeTest(){
        // Action
        familyTreeRepository.deleteById(1L);
        Optional<FamilyTree> familyTreeOptional = familyTreeRepository.findById(1L);

        // Verify
        assertThat(familyTreeOptional).isEmpty(); // Using AssertJ's assertThat
    }
}
