package com.bytepushers.family.service;

import com.bytepushers.family.exception.NotFoundException;
import com.bytepushers.family.model.*;
import com.bytepushers.family.repo.FamilyTreeRepository;
import com.bytepushers.family.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import static java.util.stream.Collectors.toList;

/**
 * Abstract service class for managing genealogy-related operations.
 * Provides a base implementation for creating {@link FamilyTree} entities.
 * Extends the {@link FamilyTreeService} interface and allows further extension by concrete implementations.
 */
@Service
public class GenealogyService implements FamilyTreeService {
    private final UserRepository userRepository;
    /** Repository for managing {@link FamilyTree} entities. */
    private final FamilyTreeRepository familyTreeRepository;

    /**
     * Constructs a new GenealogyService with the specified repository.
     *
     * @param familyTreeRepository the repository for family tree operations
     */
    @Autowired
    public GenealogyService(UserRepository userRepository, FamilyTreeRepository familyTreeRepository) {
        this.userRepository = userRepository;
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
    public FamilyTree createFamilyTree(Long userId, FamilyTree familyTree) {
        FamilyTree savedFamilyTree;

        if (familyTree == null) {
            throw new IllegalArgumentException("Invalid family_tree_id: family tree does not exist.");
        }

        savedFamilyTree = familyTreeRepository.save(familyTree);

        return savedFamilyTree;
    }

    @Override
    public FamilyTree getFamilyTree(Long id) {
        FamilyTree familyTree = familyTreeRepository.getReferenceById(id); //.orElseThrow(() -> new NotFoundException("Family tree not found."));

        List<Person> transformedPeople = familyTree.getPeople().stream()
                .map(Person::removeParentChildren)
                .collect(toList());

        familyTree = new FamilyTree.Builder()
                .id(familyTree.getId())
                .name(familyTree.getName())
                .people(transformedPeople)
                .createdDate(familyTree.getCreatedDate())
                .createdBy(familyTree.getCreatedBy())
                .updatedBy(familyTree.getUpdatedBy())
                .updatedDate(familyTree.getUpdatedDate())
                .build();

        return familyTree;
    }

    @Override
    public String deleteFamilyTree(Long id) {
        FamilyTree familyTree = familyTreeRepository.findById(id).orElse(null);
        if (familyTree == null) {
            throw new IllegalArgumentException("Invalid family_tree_id: family tree does not exist.");
        } else {
            familyTreeRepository.delete(familyTree);
            return "Family Tree with id " + id + " is deleted";
        }
    }

    @Override
    public FamilyTree updateFamilyTree(Long id, FamilyTree familyTree) {
        FamilyTree familyTreeToUpdate = familyTreeRepository.findById(id).orElseThrow(()-> new NotFoundException("Family tree with id " + id + " does not exist."));
        familyTreeToUpdate.getPeople().clear();

        if (familyTree.getPeople() != null) {
            familyTreeToUpdate.getPeople().addAll(familyTree.getPeople());
           return familyTreeRepository.save(familyTreeToUpdate);
        } else {
            throw new IllegalArgumentException("Invalid family_tree_id: family tree does not exist.");
        }
    }
}