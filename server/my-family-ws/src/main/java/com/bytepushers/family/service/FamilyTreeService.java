package com.bytepushers.family.service;

import com.bytepushers.family.model.FamilyTree;
import jakarta.validation.Valid;

public interface FamilyTreeService {
    FamilyTree createFamilyTree(@Valid FamilyTree familyTree);

}
