package com.bytepushers.family.controller;

// import com.bytepushers.family.model.FamilyMember;
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

@RestController
@RequestMapping("/api/family-trees") // Group all family-tree APIs under this base path
@CrossOrigin(origins="*")
public class FamilyTreeController {

    private static final Logger logger = LoggerFactory.getLogger(FamilyTreeController.class);

    private final FamilyTreeService familyTreeService;

    @Autowired
    public FamilyTreeController(@Qualifier("familyTreeMockService") FamilyTreeService familyTreeService) {
        this.familyTreeService = familyTreeService;
    }

    // Simple GET test endpoint
    @GetMapping("/ping")
    public ResponseEntity<String> ping(Authentication authentication) {
        logger.info("Ping endpoint hit by user: {}",
                authentication != null ? authentication.getName() : "anonymous");
        return ResponseEntity.ok("pong");
    }

    @PostMapping
    public ResponseEntity<Object> createFamilyTree(@Valid @RequestBody FamilyTree familyTree,
                                                   BindingResult bindingResult) {
        logger.debug("Received request to create family tree: {}", familyTree);
        if (bindingResult.hasErrors()) {
            ApiResponse errorResponse = new ApiResponse(List.of());
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }

        try {
            FamilyTree createdTree = familyTreeService.createFamilyTree(familyTree);
            logger.info("Successfully created family tree with ID: {}", createdTree.getId());
            return new ResponseEntity<>(createdTree, HttpStatus.CREATED);
        } catch (Exception e) {
            logger.error("Error creating family tree: ", e);  // This will print the full stack trace
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            errorResponse.put("cause", e.getCause() != null ? e.getCause().getMessage() : "Unknown");
            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /*@GetMapping("/{id}")
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
    /*@GetMapping("/{id}")
    public FamilyMember getFamilyMemberWithChildren(@PathVariable Integer id) {
        return familyTreeService.getFamilyMemberWithChildren(id);
    }*/

    @GetMapping("/{id}")
    public String getFamilyMemberWithChildren(@PathVariable Integer id) {
        return """
                {
                    "userId": 1,
                    "transactionId:": "transaction-id-value",
                    "familyTreeId": 32,
                    "familyMembers": [
                        {
                            "relationship": "Father",
                            "person": {
                                "firstName": "John",
                                "lastName": "Doe",
                                "birthDate": "1970-01-01",
                                "gender": "Male",
                                "familyMembers": [
                                    {
                                        "relationship": "Son",
                                        "person": {
                                            "firstName": "Mike",
                                            "lastName": "Doe",
                                            "birthDate": "2000-05-12",
                                            "gender": "Male",
                                            "familyMembers": [],
                                            "createdBy": "adminUser",
                                            "createdDate": "2024-10-16T10:00:00Z"
                                        },
                                        "createdBy": "adminUser",
                                        "createdDate": "2024-10-16T10:00:00Z"
                                    },
                                    {
                                        "relationship": "Daughter",
                                        "person": {
                                            "firstName": "Anna",
                                            "lastName": "Doe",
                                            "birthDate": "2005-08-20",
                                            "gender": "Female",
                                            "familyMembers": [
                                                {
                                                    "relationship": "Child",
                                                    "person": {
                                                        "firstName": "Emily",
                                                        "lastName": "Smith",
                                                        "birthDate": "2023-03-15",
                                                        "gender": "Female",
                                                        "familyMembers": []
                                                    },
                                                    "createdBy": "adminUser",
                                                    "createdDate": "2024-10-16T10:00:00Z"
                                                }
                                            ],
                                            "createdBy": "adminUser",
                                            "createdDate": "2024-10-16T10:00:00Z"
                                        },
                                        "createdBy": "adminUser",
                                        "createdDate": "2024-10-16T10:00:00Z"
                                    }
                                ],\s
                                "createdBy": "adminUser",
                                "createdDate": "2024-10-16T10:00:00Z"
                            }
                        }
                    ],
                    "parentType": "Nuclear",
                    "parentName": "Smith Family",
                    "grandParentType": "Extended",
                    "grandParentName": "Doe Family",
                    "createdBy": "adminUser",
                    "createdDate": "2024-10-16T10:00:00Z"
                }
            """;
    }
}