package com.bytepushers.family.service;

import com.bytepushers.family.model.FamilyTree;
import org.springframework.stereotype.Service;

@Service
public class FamilyTreeMockService implements FamilyTreeService {

    public FamilyTreeMockService() {

    }

    @Override
    public FamilyTree createFamilyTree(FamilyTree familyTree) {
        // TODO: Create new family tree object with incoming data and add Ids for all objects.
        familyTree.setId(1);
        return familyTree;
    }
}
