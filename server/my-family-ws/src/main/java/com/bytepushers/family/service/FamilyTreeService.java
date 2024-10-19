package com.bytepushers.family.service;

import com.bytepushers.family.model.FamilyTree;
import jakarta.validation.Valid;

public interface FamilyTreeService {
    FamilyTree createFamilyTree(@Valid FamilyTree familyTree);

    FamilyTree getFamilyTreeById(Long id);

    FamilyTree updateFamilyTree(FamilyTree familyTree, long id);

    boolean deleteFamilyTree(Long id);

    Object getAllFamilyTrees();
}
