package com.bytepushers.family.service;

import com.bytepushers.family.model.FamilyTree;
import jakarta.validation.Valid;

/**
 * Service interface for managing family trees and their members.
 * Defines operations for creating and retrieving {@link FamilyTree} and {@link FamilyMember} entities.
 */
public interface FamilyTreeService {
    /**
     * Creates a new {@link FamilyTree}.
     * Validates the input family tree object and assigns necessary metadata.
     *
     * @param familyTree the family tree to create
     * @return the created {@link FamilyTree}
     */
    FamilyTree createFamilyTree(Long userId, @Valid FamilyTree familyTree);
    /**
     * Retrieves a {@link FamilyTree} by its unique ID.
     *
     * @param id the unique identifier of the family tree
     * @return the family tree, or null if not found
     */
    FamilyTree getFamilyTree(Long id);
    FamilyTree updateFamilyTree(Long id, FamilyTree familyTree);
    String deleteFamilyTree(Long id);
}
