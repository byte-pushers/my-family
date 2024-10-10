package com.bytepushers.family.familyTree;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class FamilyTreeServiceImpl implements FamilyTreeService {

    private final FamilyTreeRepository familyTreeRepository;

    @Autowired
    public FamilyTreeServiceImpl(FamilyTreeRepository familyTreeRepository) {
        this.familyTreeRepository = familyTreeRepository;
    }

    @Override
    public FamilyTree createFamilyTree(FamilyTree familyTree) {
        // Call repository to save the entity
        return familyTreeRepository.save(familyTree);
    }

    @Override
    public FamilyTree getFamilyTreeById(Long id) {
        // Call repository to find the entity by ID
        Optional<FamilyTree> optionalFamilyTree = familyTreeRepository.findById(id);
        return optionalFamilyTree.orElse(null); // Return null if not found
    }

    @Override
    public boolean deleteFamilyTree(Long id) {
        // Check if the family tree exists before deleting
        Optional<FamilyTree> familyTree = familyTreeRepository.findById(id);
        if (familyTree.isPresent()) {
            familyTreeRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public FamilyTree updateFamilyTree(Long id, FamilyTree updatedFamilyTree) {
        // Check if the family tree exists before updating
        Optional<FamilyTree> existingFamilyTree = familyTreeRepository.findById(id);
        if (existingFamilyTree.isPresent()) {
            FamilyTree familyTreeToUpdate = existingFamilyTree.get();
            // Perform updates on the existing family tree
            familyTreeToUpdate.setParentName(updatedFamilyTree.getParentName());
            familyTreeToUpdate.setParentType(updatedFamilyTree.getParentType());
            familyTreeToUpdate.setGrandParentName(updatedFamilyTree.getGrandParentName());
            familyTreeToUpdate.setGrandParentType(updatedFamilyTree.getGrandParentType());
            familyTreeToUpdate.setSiblingName(updatedFamilyTree.getSiblingName());
            familyTreeToUpdate.setSiblingType(updatedFamilyTree.getSiblingType());
            familyTreeToUpdate.setSpouseName(updatedFamilyTree.getSpouseName());
            familyTreeToUpdate.setSpouseType(updatedFamilyTree.getSpouseType());
            familyTreeToUpdate.setChildrenName(updatedFamilyTree.getChildrenName());
            familyTreeToUpdate.setChildrenType(updatedFamilyTree.getChildrenType());
            familyTreeToUpdate.setCousinName(updatedFamilyTree.getCousinName());
            familyTreeToUpdate.setUncleName(updatedFamilyTree.getUncleName());
            familyTreeToUpdate.setAuntName(updatedFamilyTree.getAuntName());
            familyTreeToUpdate.setParentsList(updatedFamilyTree.getParentsList());
            familyTreeToUpdate.setGrandParentList(updatedFamilyTree.getGrandParentList());
            familyTreeToUpdate.setSiblingList(updatedFamilyTree.getSiblingList());
            familyTreeToUpdate.setSpouseList(updatedFamilyTree.getSpouseList());
            familyTreeToUpdate.setChildrenList(updatedFamilyTree.getChildrenList());


            // Save the updated entity
            return familyTreeRepository.save(familyTreeToUpdate);
        } else {
            return null;
        }
    }
}
