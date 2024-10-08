package com.bytepushers.family.services;

import com.bytepushers.family.DAOs.FamilyTreeRepository;
import com.bytepushers.family.model.FamilyTree;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import jakarta.validation.Valid;
import java.util.Optional;

@Service
public class FamilyTreeService {

    private final FamilyTreeRepository familyTreeRepository;
    public FamilyTreeService(FamilyTreeRepository familyTreeRepository){
        this.familyTreeRepository = familyTreeRepository;
    }

    public FamilyTree createFamilyTree(@Valid FamilyTree familyTree) {
        try {
            // Check if a family tree with the same parent name already exists
            Optional<FamilyTree> existingFamilyTree = familyTreeRepository.findByParentName(familyTree.getParentName());
            if (existingFamilyTree.isPresent()) {
                throw new DuplicateKeyException("Family Tree already exists with parent name: " + familyTree.getParentName());
            }

            // Save the family tree if no duplicate is found
            return familyTreeRepository.save(familyTree);

        } catch (DuplicateKeyException e) {
            // Handle duplicate key exception
            throw e;

        } catch (Exception e) {
            // Handle any other exceptions
            throw new RuntimeException("An error occurred while saving the family tree", e);
        }
    }
}
