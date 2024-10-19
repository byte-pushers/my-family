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

import java.util.List;

@RestController
@RequestMapping("/api/family-tree") // Group all family-tree APIs under this base path
public class FamilyTreeController {

    private static final Logger logger = LoggerFactory.getLogger(FamilyTreeController.class);

    private final FamilyTreeService familyTreeService;

    public FamilyTreeController(@Qualifier("familyTreeMockService") FamilyTreeService familyTreeService) {
        this.familyTreeService = familyTreeService;
    }

    // Family Tree POST API
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



}
