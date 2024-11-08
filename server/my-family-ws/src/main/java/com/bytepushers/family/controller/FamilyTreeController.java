package com.bytepushers.family.controller;

import com.bytepushers.family.model.FamilyMember;
import com.bytepushers.family.model.FamilyTree;
import com.bytepushers.family.service.FamilyTreeService;
import com.bytepushers.family.api.ApiResponse;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.io.Console;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/family-tree") // Group all family-tree APIs under this base path
public class FamilyTreeController {

    private static final Logger logger = LoggerFactory.getLogger(FamilyTreeController.class);

    private final FamilyTreeService familyTreeService;

    public FamilyTreeController(@Qualifier("familyTreeService") FamilyTreeService familyTreeService) {
        this.familyTreeService = familyTreeService;
    }
    // use the following qualifier when you are using the mocked service
//    public FamilyTreeController(@Qualifier("familyTreeMockedService") FamilyTreeService familyTreeService) {
//        this.familyTreeService = familyTreeService;
//    }

    // Family Tree POST API
//    @PostMapping
//    public ResponseEntity<ApiResponse<List<FamilyMember>>> createFamilyTree(@Valid @RequestBody FamilyTree familyTree, BindingResult bindingResult) {
//
//        if (bindingResult.hasErrors()) {
//            System.out.println(familyTree);
//            System.out.println("Hello Spring");
//            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//        }
//
//        // Create the family tree and retrieve only the family members for the response
//        FamilyTree createdFamilyTree = familyTreeService.createFamilyTree(familyTree);
//        ApiResponse<List<FamilyMember>> response = new ApiResponse<>(createdFamilyTree.getFamilyMembers());
//
//        logger.info("Family tree with ID {} created successfully", createdFamilyTree.getId());
//
//        // Return ApiResponse with familyMembers as the main data
//        return new ResponseEntity<>(response, HttpStatus.CREATED);
//    }
    @PostMapping
    public ResponseEntity<Object> createFamilyTree(@Valid @RequestBody FamilyTree familyTree, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            ApiResponse errorResponse = new ApiResponse(List.of());
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }

        FamilyTree createdFamilyTree = familyTreeService.createFamilyTree(familyTree);
        List<FamilyMember> familyMembers = createdFamilyTree.getFamilyMembers();
        ApiResponse response = new ApiResponse(familyMembers);
        logger.info("Family tree with ID {} created successfully", createdFamilyTree.getId());
        return new ResponseEntity<>(familyMembers, HttpStatus.CREATED);
    }

    // READ
    @GetMapping("/{id}")
    public ResponseEntity<List<FamilyMember>> getFamilyTreeById(@PathVariable Long id) {
        return familyTreeService.getFamilyTreeById(id)
                .map(familyTree -> {
                    List<FamilyMember> familyMembers = familyTree.getFamilyMembers();
                    logger.info("Retrieved family members for family tree with ID {}", id);
                    return new ResponseEntity<>(familyMembers, HttpStatus.OK);
                })
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Adjusted getAllFamilyTrees to return a list of family members across all family trees
    @GetMapping
    public ResponseEntity<List<FamilyMember>> getAllFamilyTrees() {
        List<FamilyTree> familyTrees = familyTreeService.getAllFamilyTrees();
        List<FamilyMember> allFamilyMembers = familyTrees.stream()
                .flatMap(tree -> tree.getFamilyMembers().stream())
                .collect(Collectors.toList());

        logger.info("Retrieved all family members across all family trees");
        return new ResponseEntity<>(allFamilyMembers, HttpStatus.OK);
    }


    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updateFamilyTree(@PathVariable Long id, @RequestBody FamilyTree updatedFamilyTree) {
        try {
            FamilyTree updatedTree = familyTreeService.updateFamilyTree(id, updatedFamilyTree);
            ApiResponse response = new ApiResponse(updatedTree);
            logger.info("Family tree with ID {} updated successfully", id);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (RuntimeException e) {
            ApiResponse errorResponse = new ApiResponse("Family tree not found");
            logger.error("Failed to update family tree with ID {}", id);
            return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
        }
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteFamilyTree(@PathVariable Long id) {
        try {
            familyTreeService.deleteFamilyTree(id);
            ApiResponse response = new ApiResponse("Family tree deleted successfully");
            logger.info("Deleted family tree with ID {}", id);
            return new ResponseEntity<>(response, HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            ApiResponse errorResponse = new ApiResponse("Family tree not found");
            logger.error("Failed to delete family tree with ID {}", id);
            return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
        }
    }


}