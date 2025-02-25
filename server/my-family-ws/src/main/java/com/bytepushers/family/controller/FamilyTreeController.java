package com.bytepushers.family.controller;

import com.bytepushers.family.model.FamilyTree;
import com.bytepushers.family.service.FamilyTreeService;
import com.bytepushers.family.api.FamilyTreeRequestPayload;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api") // Group all family-tree APIs under this base path
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
    public FamilyTreeController(@Qualifier("genealogyService") FamilyTreeService familyTreeService) {
        this.familyTreeService = familyTreeService;
    }

    @PostMapping(value = "/family-trees", consumes = "application/json", produces = "application/json")
    public ResponseEntity<FamilyTree> createFamilyTree(@Valid @RequestBody FamilyTreeRequestPayload payload/*,
                                                   BindingResult bindingResult*/) {
        logger.debug("Received request to create family tree: {}", payload.toString());
        FamilyTree createdTree = familyTreeService.createFamilyTree(payload.getUserId(), payload.getFamilyTree());
        System.out.println("payload: " + createdTree);

        return new ResponseEntity<>(createdTree, HttpStatus.CREATED);
    }

    @GetMapping(value ="/family-trees/{id}")
    public ResponseEntity<?> getFamilyTree(@PathVariable Long id) {
        logger.debug("Received request to get family tree: {}", id);
        FamilyTree familyTree = familyTreeService.getFamilyTree(id);
        return new ResponseEntity<>(familyTree, HttpStatus.OK);
    }

    @DeleteMapping(value="/family-trees/{id}")
    public ResponseEntity<?> deleteFamilyTree(@PathVariable Long id) {
        logger.debug("Received request to delete family tree: {}", id);
        String message = familyTreeService.deleteFamilyTree(id);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @PatchMapping(value = "/family-trees/{id}")
    public ResponseEntity<?> updateFamilyTree(@PathVariable Long id, @Valid @RequestBody FamilyTreeRequestPayload payload) {
        logger.debug("Received request to update family tree: {}", id);
        FamilyTree familyTree = familyTreeService.updateFamilyTree(id, payload.getFamilyTree());
        return new ResponseEntity<>(familyTree, HttpStatus.OK);
    }
}