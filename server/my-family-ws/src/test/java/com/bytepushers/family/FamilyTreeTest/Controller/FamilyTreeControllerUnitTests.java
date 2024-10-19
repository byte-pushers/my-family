//package com.bytepushers.family.FamilyTreeTest.Controller;
//
//import com.bytepushers.family.controller.FamilyTreeController;
//import com.bytepushers.family.model.FamilyTree;
//import com.bytepushers.family.service.FamilyTreeService;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import org.junit.jupiter.api.*;
//import org.springframework.http.MediaType;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.ResultActions;
//
//import static org.mockito.BDDMockito.given;
//
//import java.util.ArrayList;
//import java.util.List;
//import static org.mockito.BDDMockito.*;
//import static org.hamcrest.CoreMatchers.is;
//import static org.mockito.ArgumentMatchers.any;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
//import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//@WebMvcTest(FamilyTreeController.class)
//@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
//public class FamilyTreeControllerUnitTests {
//
//    @Autowired
//    private MockMvc mockMvc;
//
//    @MockBean
//    private FamilyTreeService familyTreeService;
//
//    @Autowired
//    private ObjectMapper objectMapper;
//
//    FamilyTree familyTree;
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
//    // Post Controller Test
//    @Test
//    @Order(1)
//    public void saveFamilyTreeTest() throws Exception {
//        // Precondition
//        given(familyTreeService.createFamilyTree(any(FamilyTree.class))).willReturn(familyTree);
//
//        // Action
//        ResultActions response = mockMvc.perform(post("/api/family-tree")
//                .contentType(MediaType.APPLICATION_JSON)
//                .content(objectMapper.writeValueAsString(familyTree)));
//
//        // Verify
//        response.andExpect(status().isCreated()) // Update status check
//                .andDo(print())
//                .andExpect(jsonPath("$.data.parentName", is(familyTree.getParentName()))) // Adjust to access ApiResponse
//                .andExpect(jsonPath("$.data.parentType", is(familyTree.getParentType())))
//                .andExpect(jsonPath("$.data.grandParentName", is(familyTree.getGrandParentName())))
//                .andExpect(jsonPath("$.data.grandParentType", is(familyTree.getGrandParentType())));
//    }
//
//    // Get All Family Trees Test
//    @Test
//    @Order(2)
//    public void getFamilyTest() throws Exception {
//        // Precondition
//        List<FamilyTree> familyTreeList = new ArrayList<>();
//        familyTreeList.add(familyTree);
//        familyTreeList.add(FamilyTree.builder()
//                .id(2L)
//                .parentName("John")
//                .parentType("Father")
//                .grandParentName("James")
//                .grandParentType("Grandfather")
//                .build());
//        given(familyTreeService.getAllFamilyTrees()).willReturn(familyTreeList);
//
//        // Action
//        ResultActions response = mockMvc.perform(get("/api/family-tree"));
//
//        // Verify
//        response.andExpect(status().isOk())
//                .andDo(print())
//                .andExpect(jsonPath("$.data.size()", is(familyTreeList.size()))); // Adjusted to check ApiResponse's data field
//    }
//
//    // Get Family Tree by ID Test
//    @Test
//    @Order(3)
//    public void getByIdFamilyTreeTest() throws Exception {
//        // Precondition
//        given(familyTreeService.getFamilyTreeById(familyTree.getId())).willReturn(familyTree);
//
//        // Action
//        ResultActions response = mockMvc.perform(get("/api/family-tree/{id}", familyTree.getId()));
//
//        // Verify
//        response.andExpect(status().isOk())
//                .andDo(print())
//                .andExpect(jsonPath("$.data.parentName", is(familyTree.getParentName()))) // Adjust to check ApiResponse's data
//                .andExpect(jsonPath("$.data.parentType", is(familyTree.getParentType())))
//                .andExpect(jsonPath("$.data.grandParentName", is(familyTree.getGrandParentName())))
//                .andExpect(jsonPath("$.data.grandParentType", is(familyTree.getGrandParentType())));
//    }
//
//    // Update FamilyTree Test
//    @Test
//    @Order(4)
//    public void updateFamilyTreeTest() throws Exception {
//        // Precondition
//        given(familyTreeService.getFamilyTreeById(familyTree.getId())).willReturn(familyTree);
//        familyTree.setParentName("Updated parent name");
//        familyTree.setGrandParentType("updated grandparent type");
//        given(familyTreeService.updateFamilyTree(familyTree, familyTree.getId())).willReturn(familyTree);
//
//        // Action
//        ResultActions response = mockMvc.perform(put("/api/family-tree/{id}", familyTree.getId())
//                .contentType(MediaType.APPLICATION_JSON)
//                .content(objectMapper.writeValueAsString(familyTree)));
//
//        // Verify
//        response.andExpect(status().isOk())
//                .andDo(print())
//                .andExpect(jsonPath("$.data.parentName", is(familyTree.getParentName()))) // Adjust to check ApiResponse's data
//                .andExpect(jsonPath("$.data.parentType", is(familyTree.getParentType())))
//                .andExpect(jsonPath("$.data.grandParentName", is(familyTree.getGrandParentName())))
//                .andExpect(jsonPath("$.data.grandParentType", is(familyTree.getGrandParentType())));
//    }
//
//    // Delete Family Tree Test
//    @Test
//    @Order(5)
//    public void deleteFamilyTest() throws Exception {
//        // Precondition
//        willDoNothing().given(familyTreeService).deleteFamilyTree(familyTree.getId());
//
//        // Action
//        ResultActions response = mockMvc.perform(delete("/api/family-tree/{id}", familyTree.getId()));
//
//        // Verify
//        response.andExpect(status().isNoContent()) // Adjusted to check correct status
//                .andDo(print());
//    }
//}
