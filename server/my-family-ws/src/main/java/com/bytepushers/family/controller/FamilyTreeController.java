package com.bytepushers.family.controller;

import com.bytepushers.family.api.FamilyTreeRequestPayload;
import com.bytepushers.family.model.FamilyMember;
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
import java.util.stream.Collectors;

/**
 * Controller class for managing family trees.
 * Provides REST endpoints for CRUD operations on family trees.
 * <p>
 * All APIs are grouped under the base path "/api/family-trees".
 * </p>
 */
@RestController
@RequestMapping("/api/family-trees")
public class FamilyTreeController {

    private static final Logger logger = LoggerFactory.getLogger(FamilyTreeController.class);

    private final FamilyTreeService familyTreeService;

    /**
     * Constructs the FamilyTreeController with the specified FamilyTreeService.
     *
     * @param familyTreeService the service layer handling family tree logic
     */
    public FamilyTreeController(@Qualifier("familyTreeService") FamilyTreeService familyTreeService) {
        this.familyTreeService = familyTreeService;
    }

    /**
     * Creates a new family tree.
     *
     * @param familyTreeRequestPayload the request payload containing user ID and family members
     * @param bindingResult            captures validation errors, if any
     * @return a {@link ResponseEntity} containing the created family members and HTTP status code
     */
    @PostMapping
    public ResponseEntity<Object> createFamilyTree(@Valid @RequestBody FamilyTreeRequestPayload familyTreeRequestPayload,
                                                   BindingResult bindingResult) {
        Long userId = familyTreeRequestPayload.getUserId();
        List<FamilyMember> createdFamilyMembers = familyTreeRequestPayload.getFamilyMembers();

        logger.info("Creating family tree for user ID {}", userId);

        List<FamilyMember> familyMembers = familyTreeService.createFamilyTree(createdFamilyMembers);
        logger.info("Family tree created successfully for user ID {}", userId);
        return new ResponseEntity<>(familyMembers, HttpStatus.CREATED);
    }

    /**
     * Retrieves a family tree by its ID.
     *
     * @param id the ID of the family tree to retrieve
     * @return a {@link ResponseEntity} containing the family tree data or an error message
     */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getFamilyTreeById(@PathVariable Long id) {
        if (id <= 0) {
            logger.warn("Invalid ID provided: {}", id);
            return new ResponseEntity<>(new ApiResponse("Invalid ID"), HttpStatus.BAD_REQUEST);
        }

        return familyTreeService.getFamilyTreeById(id)
                .map(familyMember -> {
                    logger.info("Retrieved family member with ID: {}", familyMember.getId());

                    Long userId = (long) familyMember.getId();
                    FamilyTreeRequestPayload payload = new FamilyTreeRequestPayload(userId, List.of(familyMember));
                    return new ResponseEntity<>(new ApiResponse(payload), HttpStatus.OK);
                })
                .orElseGet(() -> {
                    logger.warn("Family member with ID {} not found", id);
                    return new ResponseEntity<>(new ApiResponse("Family member not found"), HttpStatus.NOT_FOUND);
                });
    }

    /**
     * Retrieves all family trees.
     *
     * @return a {@link ResponseEntity} containing the list of all family members or an error message
     */
    @GetMapping
    public ResponseEntity<Object> getAllFamilyTrees() {
        try {
            logger.info("Fetching all family trees");
            List<FamilyMember> familyMembers = familyTreeService.getAllFamilyTrees();
            return new ResponseEntity<>(new ApiResponse(familyMembers), HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Failed to retrieve all family members", e);
            return new ResponseEntity<>(new ApiResponse("Error retrieving family members"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Updates a family tree with the given ID.
     *
     * @param id                  the ID of the family tree to update
     * @return a {@link ResponseEntity} containing the updated family member or an error message
     */
    @PutMapping("/{id}")
    public ResponseEntity<Object> updateFamilyTree(@PathVariable Long id, @Valid @RequestBody FamilyTreeRequestPayload familyTreeRequestPayload, BindingResult bindingResult) {
        // Validate the request payload
        if (bindingResult.hasErrors()) {
            String errors = bindingResult.getFieldErrors()
                    .stream()
                    .map(error -> error.getField() + ": " + error.getDefaultMessage())
                    .collect(Collectors.joining(", "));
            logger.warn("Validation failed for family tree update: {}", errors);
            return new ResponseEntity<>(new ApiResponse("Validation failed: " + errors), HttpStatus.BAD_REQUEST);
        }

        Long userId = familyTreeRequestPayload.getUserId();
        List<FamilyMember> updatedFamilyMembers = familyTreeRequestPayload.getFamilyMembers();

        logger.info("Updating family tree for user ID {} and FamilyTree ID {}", userId, id);

        try {
            // Update each family member and persist changes
            List<FamilyMember> updatedMembers = updatedFamilyMembers.stream()
                    .map(member -> familyTreeService.updateFamilyTree(id, member))
                    .toList();

            logger.info("Family tree updated successfully for user ID {}", userId);
            return new ResponseEntity<>(updatedMembers, HttpStatus.OK);
        } catch (RuntimeException e) {
            logger.warn("Family tree with ID {} not found", id, e);
            return new ResponseEntity<>(new ApiResponse("Family tree not found"), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            logger.error("Error updating family tree for user ID {} and FamilyTree ID {}", userId, id, e);
            return new ResponseEntity<>(new ApiResponse("Error updating family tree"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    /**
     * Deletes a family tree by its ID.
     *
     * @param id the ID of the family tree to delete
     * @return a {@link ResponseEntity} containing a success message or an error message
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteFamilyTree(@PathVariable Long id) {
        try {
            logger.info("Deleting family member with ID {}", id);
            familyTreeService.deleteFamilyTree(id);
            logger.info("Family member with ID {} deleted successfully", id);
            return new ResponseEntity<>(new ApiResponse("Family member deleted successfully"), HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            logger.warn("Failed to delete family member with ID {}", id, e);
            return new ResponseEntity<>(new ApiResponse("Family member not found"), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            logger.error("Error deleting family member with ID {}", id, e);
            return new ResponseEntity<>(new ApiResponse("Error deleting family member"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
