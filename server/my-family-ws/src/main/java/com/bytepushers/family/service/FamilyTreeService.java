package com.bytepushers.family.service;

import com.bytepushers.family.model.FamilyTree;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

import java.util.List;
import java.util.Optional;

public interface FamilyTreeService {
    FamilyTree createFamilyTree(@Valid FamilyTree familyTree);
    Optional<FamilyTree> getFamilyTreeById(long id);
    List<FamilyTree> getAllFamilyTrees();
    FamilyTree updateFamilyTree(long id, @Valid FamilyTree familyTree);
    void deleteFamilyTree(long id);

}
