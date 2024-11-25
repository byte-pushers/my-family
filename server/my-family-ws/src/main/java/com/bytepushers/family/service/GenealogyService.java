package com.bytepushers.family.service;

import com.bytepushers.family.model.FamilyMember;
import com.bytepushers.family.model.FamilyTree;
import com.bytepushers.family.repo.FamilyTreeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Abstract service class for managing genealogy-related operations.
 * Provides a base implementation for creating {@link FamilyTree} entities.
 * Extends the {@link FamilyTreeService} interface and allows further extension by concrete implementations.
 */
@Service
public abstract class GenealogyService implements FamilyTreeService {

    /** Repository for managing {@link FamilyTree} entities. */
    private final FamilyTreeRepository familyTreeRepository;

    /**
     * Constructs a new GenealogyService with the specified repository.
     *
     * @param familyTreeRepository the repository for family tree operations
     */
    @Autowired
    public GenealogyService(FamilyTreeRepository familyTreeRepository) {
        this.familyTreeRepository = familyTreeRepository;
    }

    /**
     * Creates a new {@link FamilyTree}.
     * Delegates the save operation to the {@link FamilyTreeRepository}.
     *
     * @param familyTree the family tree to create
     * @return the created family tree
     */
    @Override
    public String createFamilyTree(FamilyTree familyTree) {
        // Call repository to save the entity
        //return familyTreeRepository.save(familyTree);
        return "";
    }

    @Override
    public FamilyMember getFamilyMemberWithChildren(Integer id) {
        return null;
    }
}