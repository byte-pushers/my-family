package com.bytepushers.family.controller;

import com.bytepushers.family.api.ApiResponse;
import com.bytepushers.family.service.FamilyTreeService;
import com.bytepushers.family.model.FamilyTree;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/family-tree")
public class FamilyTreeController {

    private static final Logger logger = LoggerFactory.getLogger(FamilyTreeController.class);

    private final FamilyTreeService familyTreeService;

    @Autowired
    public FamilyTreeController(@Qualifier("familyTreeMockService") FamilyTreeService familyTreeService) {
        this.familyTreeService = familyTreeService;
    }

    // Family Tree POST API
    @PostMapping
    public ResponseEntity<Object> createFamilyTree(
            @Valid @RequestBody FamilyTree familyTree,
            BindingResult bindingResult
    ) {
        if (bindingResult.hasErrors()) {
            ApiResponse errorResponse = new ApiResponse(
                    bindingResult.getAllErrors(),
                    "Validation failed for the input data",
                    HttpStatus.BAD_REQUEST.value()
            );
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }

        FamilyTree createdFamilyTree = familyTreeService.createFamilyTree(familyTree);
        ApiResponse response = new ApiResponse(
                createdFamilyTree,
                "Family tree was created successfully",
                HttpStatus.CREATED.value()
        );
        logger.info("Family tree with ID {} created successfully", createdFamilyTree.getId());
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // Family Tree GET API (retrieve by ID)
    @GetMapping("/{id}")
    public ResponseEntity<Object> getFamilyTree(@PathVariable Long id) {
        Optional<FamilyTree> familyTree = Optional.ofNullable(familyTreeService.getFamilyTreeById(id));
        if (familyTree.isEmpty()) {
            ApiResponse errorResponse = new ApiResponse(null, "Family tree not found", HttpStatus.NOT_FOUND.value());
            return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
        }

        ApiResponse response = new ApiResponse(familyTree, "Family tree found", HttpStatus.OK.value());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // Family Tree PUT API (update by ID)
    @PutMapping("/{id}")
    public ResponseEntity<Object> updateFamilyTree(
            @PathVariable Long id,
            @Valid @RequestBody FamilyTree updatedFamilyTree,
            BindingResult bindingResult
    ) {
        if (bindingResult.hasErrors()) {
            ApiResponse errorResponse = new ApiResponse(
                    bindingResult.getAllErrors(),
                    "Validation failed for the input data",
                    HttpStatus.BAD_REQUEST.value()
            );
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }

        FamilyTree updatedTree = familyTreeService.updateFamilyTree(updatedFamilyTree, id);
        if (updatedTree == null) {
            ApiResponse errorResponse = new ApiResponse(
                    null,
                    "Family tree not found",
                    HttpStatus.NOT_FOUND.value()
            );
            logger.warn("Family tree with ID {} not found for update", id);
            return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
        }

        ApiResponse response = new ApiResponse(updatedTree, "Family tree updated successfully", HttpStatus.OK.value());
        logger.info("Family tree with ID {} updated successfully", updatedTree.getId());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // Family Tree DELETE API (delete by ID)
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteFamilyTree(@PathVariable Long id) {
        boolean deleted = familyTreeService.deleteFamilyTree(id);
        if (!deleted) {
            ApiResponse errorResponse = new ApiResponse(
                    null,
                    "Family tree not found",
                    HttpStatus.NOT_FOUND.value()
            );
            logger.warn("Family tree with ID {} not found for deletion", id);
            return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
        }

        logger.info("Family tree with ID {} deleted successfully", id);
        return ResponseEntity.noContent().build();
    }
}
