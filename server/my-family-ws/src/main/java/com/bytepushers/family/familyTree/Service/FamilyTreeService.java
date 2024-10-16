package com.bytepushers.family.familyTree.Service;

import com.bytepushers.family.familyTree.Model.FamilyTree;
import jakarta.validation.Valid;

public interface FamilyTreeService {
    FamilyTree createFamilyTree(@Valid FamilyTree familyTree);
    FamilyTree getFamilyTreeById(Long id);
    boolean deleteFamilyTree(Long id);
    FamilyTree updateFamilyTree(Long id, @Valid FamilyTree updatedFamilyTree);
}
