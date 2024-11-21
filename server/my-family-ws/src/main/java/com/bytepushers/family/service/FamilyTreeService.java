package com.bytepushers.family.service;

import com.bytepushers.family.model.FamilyMember;
import com.bytepushers.family.model.FamilyTree;
import jakarta.validation.Valid;
import org.springframework.stereotype.Service;

public interface FamilyTreeService {
    FamilyTree createFamilyTree(@Valid FamilyTree familyTree);
    FamilyTree getFamilyTree(Integer id);

    FamilyMember getFamilyMemberWithChildren(Integer id);
}
