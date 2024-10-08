package com.bytepushers.family.DAOs;

import com.bytepushers.family.model.FamilyTree;
import jakarta.validation.Valid;

import java.util.Optional;
public interface FamilyTreeRepository {
    Optional<FamilyTree> findByParentName(String name);

    FamilyTree save(@Valid FamilyTree familyTree);
}
