//package com.bytepushers.family.FamilyTreeTest.Service;
//import org.junit.jupiter.api.*;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.junit.jupiter.MockitoExtension;
//import com.bytepushers.family.model.FamilyTree;
//import com.bytepushers.family.repo.FamilyTreeRepository;
//import com.bytepushers.family.service.Impl.FamilyTreeServiceImpl;
//
//import java.util.List;
//import java.util.Optional;
//import static org.assertj.core.api.Assertions.assertThat;
//import static org.mockito.BDDMockito.given;
//import static org.mockito.BDDMockito.willDoNothing;
//import static org.mockito.Mockito.verify;
//import static org.mockito.Mockito.times;
//
//
//@ExtendWith(MockitoExtension.class)
//@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
//public class FamilyTreeServiceUnitTests {
//
//    @Mock
//    private FamilyTreeRepository familyTreeRepository;
//
//    @InjectMocks
//    private FamilyTreeServiceImpl familyTreeService;
//
//    private FamilyTree familyTree;
//
//    @BeforeEach
//    public void setup(){
//        familyTree = FamilyTree.builder()
//                .id(1L)
//                .parentName("Paul")
//                .parentType("Father")
//                .grandParentName("Marta")
//                .grandParentType("GrandMother")
//                .build();
//    }
//
//    @Test
//    @Order(1)
//    public void saveFamilyTreeTest(){
//        // precondition
//        given(familyTreeRepository.save(familyTree)).willReturn(familyTree);
//
//        //action
//        FamilyTree savedFamilyTree = familyTreeService.createFamilyTree(familyTree);
//
//        // verify the output
//        System.out.println(savedFamilyTree);
//        assertThat(savedFamilyTree).isNotNull();
//
//    }
//
//    @Test
//    @Order(2)
//    public void getFamilyTreeById(){
//        // precondition
//        given(familyTreeRepository.findById(1L)).willReturn(Optional.of(familyTree));
//
//        // action
//        FamilyTree existingFamilytree = familyTreeService.getFamilyTreeById(familyTree.getId());
//
//        // verify
//        System.out.println(existingFamilytree);
//        assertThat(existingFamilytree).isNotNull();
//    }
//
//    @Test
//    @Order(3)
//    public void getAllFamilyTree(){
//        FamilyTree familyTree1 = FamilyTree.builder()
//                .id(2L)
//                .parentName("David")
//                .parentType("Father")
//                .grandParentName("Rich")
//                .grandParentType("GrandMother")
//                .build();
//        // precondition
//        given(familyTreeRepository.findAll()).willReturn(List.of(familyTree, familyTree1));
//
//        // action
//        List<FamilyTree> familyTreeList = familyTreeService.getAllFamilyTrees();
//
//        // verify
//        System.out.println(familyTreeList);
//        assertThat(familyTreeList).isNotNull();
//        assertThat(familyTreeList.size()).isGreaterThan(1);
//
//    }
//
//    @Test
//    @Order(4)
//    public void updateFamilyTree(){
//
//        // precondition
//        given(familyTreeRepository.findById(familyTree.getId())).willReturn(Optional.of(familyTree));
//        familyTree.setParentName("Abraham");
//        familyTree.setParentType("Mother");
//        familyTree.setGrandParentType("GrandMother");
//        given(familyTreeRepository.save(familyTree)).willReturn(familyTree);
//
//        // action
//        FamilyTree updatedFamilyTree = familyTreeService.updateFamilyTree(familyTree, familyTree.getId());
//
//        // verify
//        System.out.println(updatedFamilyTree);
//        assertThat(updatedFamilyTree.getParentName()).isEqualTo(("Abraham"));
//        assertThat(updatedFamilyTree.getParentType()).isEqualTo(("Mother"));
//        assertThat(updatedFamilyTree.getGrandParentType()).isEqualTo(("GrandMother"));
//
//    }
//
//    @Test
//    @Order(5)
//    public void deleteFamilyTree(){
//
//        // precondition
//        willDoNothing().given(familyTreeRepository).deleteById(familyTree.getId());
//
//        //action
//        familyTreeService.deleteFamilyTree(familyTree.getId());
//
//        // verify
//        verify(familyTreeRepository, times(1)).deleteById(familyTree.getId());
//    }
//
//}
