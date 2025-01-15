package com.bytepushers.family.controller;

import com.bytepushers.family.model.FamilyMember;
import com.bytepushers.family.model.FamilyTree;
import com.bytepushers.family.service.FamilyTreeService;
import com.bytepushers.family.api.ApiResponse;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * REST controller for managing family trees.
 * Provides endpoints for creating, retrieving, and testing APIs related to family trees and their members.
 * <p>
 * All endpoints are grouped under the base path "/api/family-trees".
 * </p>
 */
@RestController
@RequestMapping("/api")
@CrossOrigin
public class FamilyTreeController {

    /** Logger for logging request and response details. */
    private static final Logger logger = LoggerFactory.getLogger(FamilyTreeController.class);

    /** Service layer dependency for managing family trees. */
    private final FamilyTreeService familyTreeService;

    /**
     * Constructs a new FamilyTreeController with the specified service.
     *
     * @param familyTreeService the family tree service implementation
     */
    @Autowired
    public FamilyTreeController(@Qualifier("familyTreeMockService") FamilyTreeService familyTreeService) {
        this.familyTreeService = familyTreeService;
    }

    /**
     * A simple ping endpoint to test the API.
     *
     * @param authentication the current user's authentication details
     * @return a ResponseEntity containing "pong" and an HTTP status of 200 (OK)
     */
    @GetMapping("/ping")
    public ResponseEntity<String> ping(Authentication authentication) {
        return ResponseEntity.ok("pong");
    }

    /**
     * Endpoint for creating a new family tree.
     *
     * @param familyTree   the family tree to create
     * @param bindingResult the result of validating the request body
     * @return a ResponseEntity containing the created family tree or an error response
     */
    @PostMapping
    public ResponseEntity<Object> createFamilyTree(@Valid @RequestBody FamilyTree familyTree,
                                                   BindingResult bindingResult) {
        return null; // Implementation details are omitted here for documentation focus.
    }
    /**
     * Endpoint for retrieving a family member along with their children by ID.
     *
     * @param id the ID of the family member to retrieve
     * @return the family member with their associated children
     */
/*    @GetMapping("/family-trees/{id}")
    public ResponseEntity<FamilyTree> getFamilyTree(@PathVariable Integer id) {
        logger.info("Attempting to get family tree with id: {}", id);
        try {
            FamilyTree familyTree = familyTreeService.getFamilyTree(id);
            if (familyTree == null) {
                logger.warn("No family tree found with id: {}", id);
                return ResponseEntity.notFound().build();
            }
            familyTree.getFamilyMembers().size(); // Initialize the collection
            logger.info("Successfully retrieved family tree with id: {}", id);
            return ResponseEntity.ok(familyTree);
        } catch (Exception e) {
            logger.error("Error retrieving family tree with id: " + id, e);
            return ResponseEntity.internalServerError().build();
        }
    }*/
    @GetMapping("/family-trees/{id}")
    public String getFamilyMemberWithChildren(@PathVariable Integer id) {
        return familyTreeService.getFamilyTree(id); // .getFamilyMemberWithChildren(id);
    }
}