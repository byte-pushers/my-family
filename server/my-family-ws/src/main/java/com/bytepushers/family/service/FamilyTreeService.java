package com.bytepushers.family.service;

import com.bytepushers.family.model.FamilyMember;
import com.bytepushers.family.model.FamilyTree;
import jakarta.validation.Valid;

import java.util.List;
import java.util.Optional;

public interface FamilyTreeService {
    List<FamilyMember> createFamilyTree(@Valid List<FamilyMember> familyMember);
    /*Optional<FamilyMember> getFamilyTreeById(long id);
    List<FamilyMember> getAllFamilyTrees();
    FamilyTree updateFamilyTree(long id, @Valid FamilyTree familyTree);
    void deleteFamilyTree(long id);*/

}
