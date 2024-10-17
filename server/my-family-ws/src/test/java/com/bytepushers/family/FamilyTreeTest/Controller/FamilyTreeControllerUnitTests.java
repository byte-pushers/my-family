package com.bytepushers.family.FamilyTreeTest.Controller;
import com.bytepushers.family.controller.FamilyTreeController;
import com.bytepushers.family.model.FamilyTree;
import com.bytepushers.family.service.FamilyTreeService;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.*;
import org.springframework.http.MediaType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import static org.mockito.BDDMockito.given;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import static org.mockito.BDDMockito.*;
import static org.hamcrest.CoreMatchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(FamilyTreeController.class)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class FamilyTreeControllerUnitTests {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private FamilyTreeService familyTreeService;

    @Autowired
    private ObjectMapper objectMapper;

    FamilyTree familyTree;

    @BeforeEach
    public void setup(){
        familyTree = FamilyTree.builder()
                .id(1L)
                .parentName("Paul")
                .parentType("Father")
                .grandParentName("Marta")
                .grandParentType("GrandMother")
                .build();
    }
// Post Controller
    @Test
    @Order(1)
    public void saveFamilyTreeTest() throws Exception{
        //precondition
        given(familyTreeService.saveFamilyTree(any(FamilyTree.class))).willReturn(familyTree);


        // action
        ResultActions response = mockMvc.perform(post("/api/family-tree")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(familyTree)));

        // Verify
        response.andExpect(status().isOk())
                .andDo(print())
                .andExpect(jsonPath("$.parentName", is(familyTree.getParentName())))
                .andExpect(jsonPath("$.parentType", is(familyTree.getParentType())))
                .andExpect(jsonPath("$.grandParentName", is(familyTree.getGrandParentName())))
                .andExpect(jsonPath("$.grandParentType", is(familyTree.getGrandParentType())));
    }

    //Get Controller
    @Test
    @Order(2)
    public void getFamilyTest() throws Exception{
        // precondition
        List<FamilyTree> familyTreeList = new ArrayList<>();
        familyTreeList.add(familyTree);
        familyTreeList.add(familyTree.builder().id(2L).parentName("John").parentType("Father").grandParentName("James").grandParentType("Grandfather").build());
        given(familyTreeService.getAllFamilyTrees()).willReturn(familyTreeList);

        // action
        ResultActions response = mockMvc.perform(get("/api/family-tree/"));

        // verify the output
        response.andExpect(status().isOk())
                .andDo(print())
                .andExpect(jsonPath("$.size()",
                        is(familyTreeList.size())));
    }
    //get by Id controller
    @Test
    @Order(3)
    public void getByIdFamilyTreeTest() throws Exception{
        // precondition
        given(familyTreeService.getFamilyTreeById(familyTree.getId())).willReturn(Optional.of(familyTree));

        // action
        ResultActions response = mockMvc.perform(get("/api/family-tree/{id}", familyTree.getId()));

        // Verify
        response.andExpect(status().isOk())
                .andDo(print())
                .andExpect(jsonPath("$.parentName", is(familyTree.getParentName())))
                .andExpect(jsonPath("$.parentType", is(familyTree.getParentType())))
                .andExpect(jsonPath("$.grandParentName", is(familyTree.getGrandParentName())))
                .andExpect(jsonPath("$.grandParentType", is(familyTree.getGrandParentType())));
    }
    // Update FamilyTree
    @Test
    @Order(4)
    public void updateFamilyTreeTest() throws Exception{
        // precondition
        given(familyTreeService.getFamilyTreeById(familyTree.getId())).willReturn(Optional.of(familyTree));
        familyTree.setParentName("Updated parent name");
        familyTree.setGrandParentType("updated grandparent type");
        given(familyTreeService.updateFamilyTree(familyTree, familyTree.getId())).willReturn(familyTree);

        // action
        ResultActions response = mockMvc.perform(put("/api/family-tree/{id}", familyTree.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(familyTree)));

        // Verify
        response.andExpect(status().isOk())
                .andDo(print())
                .andExpect(jsonPath("$.parentName", is(familyTree.getParentName())))
                .andExpect(jsonPath("$.parentType", is(familyTree.getParentType())))
                .andExpect(jsonPath("$.grandParentName", is(familyTree.getGrandParentName())))
                .andExpect(jsonPath("$.grandParentType", is(familyTree.getGrandParentType())));
    }
    // delete family tree
    @Test
    @Order(5)
    public void deleteFamilyTest() throws Exception {
        // Precondition
        willDoNothing().given(familyTreeService).deleteFamilyTree(familyTree.getId());

        // Action
        ResultActions response = mockMvc.perform(delete("/api/family-tree/{id}", familyTree.getId()));

        // Verify the output
        response.andExpect(status().isOk())
                .andDo(print());
    }
}