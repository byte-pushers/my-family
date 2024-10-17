package com.bytepushers.family.service;

import com.bytepushers.family.model.FamilyTree;
import jakarta.validation.Valid;

import java.util.List;
import java.util.Optional;

public interface FamilyTreeService {
    FamilyTree createFamilyTree(@Valid FamilyTree familyTree);
    FamilyTree getFamilyTreeById(Long id);
    FamilyTree saveFamilyTree(FamilyTree familyTree);
    List<FamilyTree> getAllFamilyTrees();
    Optional<FamilyTree> getFamilyTreeById(long id);
    FamilyTree updateFamilyTree(FamilyTree familyTree, long id);
    boolean deleteFamilyTree(Long id);

    FamilyTree updateFamilyTree(Long id, FamilyTree updatedFamilyTree);
}