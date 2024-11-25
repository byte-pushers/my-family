package com.bytepushers.family.service;

import com.bytepushers.family.model.FamilyMember;
import com.bytepushers.family.model.FamilyTree;
import jakarta.validation.Valid;

/**
 * Service interface for managing family trees and their members.
 * Defines operations for creating and retrieving {@link FamilyTree} and {@link FamilyMember} entities.
 */
public interface FamilyTreeService {
    String createFamilyTree(@Valid FamilyTree familyTree);
    String getFamilyTree(Integer id);

    /**
     * Retrieves a {@link FamilyMember} along with its child members by the member's unique ID.
     *
     * @param id the unique identifier of the family member
     * @return the {@link FamilyMember} with its child members, or null if not found
     */
    FamilyMember getFamilyMemberWithChildren(Integer id);
}
