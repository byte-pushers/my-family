package com.bytepushers.family.service;

import com.bytepushers.family.model.FamilyMember;
import com.bytepushers.family.model.FamilyTree;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;

/**
 * Interface for managing family trees and members.
 * Provides methods for creating, retrieving, and managing family tree data.
 */
public interface FamilyTreeService {

    /**
     * Creates a new family tree.
     *
     * @param familyTree the family tree to create
     * @return the created family tree
     */
    FamilyTree createFamilyTree(@Valid FamilyTree familyTree);

    /**
     * Retrieves a family tree by its ID.
     *
     * @param id the ID of the family tree
     * @return the family tree if found
     */
    FamilyTree getFamilyTree(Long id);

    /**
     * Retrieves a family member along with its children by ID.
     *
     * @param id the ID of the family member
     * @return the family member if found
     */
    FamilyMember getFamilyMemberWithChildren(Long id);

    /**
     * Creates or updates a family tree with the given family members.
     *
     * @param familyMembers the list of root family members
     * @param userId        the ID of the user creating the family tree
     * @param familyTreeId  the ID of the family tree (null for new trees)
     * @return a list of all saved family members
     */
    List<FamilyMember> createOrUpdateFamilyTree(List<FamilyMember> familyMembers, Long userId, Long familyTreeId);

    /**
     * Retrieves a family member by its ID.
     *
     * @param id the ID of the family member
     * @return an {@link Optional} containing the family member if found, or empty if not
     */
    Optional<FamilyMember> getFamilyTreeById(Long id);

    /**
     * Retrieves all family members.
     *
     * @return a list of all family members
     */
    List<FamilyMember> getAllFamilyTrees();

    /**
     * Updates an existing family tree or member.
     *
     * @param id                the ID of the family member to update
     * @param updatedFamilyTree the updated family tree or member
     * @return the updated family member
     */
    FamilyMember updateFamilyTree(Long id, @Valid FamilyMember updatedFamilyTree);

    /**
     * Deletes a family tree by its ID.
     *
     * @param id the ID of the family tree
     */
    void deleteFamilyTree(Long id);
}
