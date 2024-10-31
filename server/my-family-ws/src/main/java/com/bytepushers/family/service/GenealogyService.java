package com.bytepushers.family.service;

import com.bytepushers.family.model.FamilyTree;
import com.bytepushers.family.repo.FamilyTreeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GenealogyService implements FamilyTreeService {

    private final FamilyTreeRepository familyTreeRepository;

    @Autowired
    public GenealogyService(FamilyTreeRepository familyTreeRepository) {
        this.familyTreeRepository = familyTreeRepository;
    }

    @Override
    public FamilyTree createFamilyTree(FamilyTree familyTree) {
        // Call repository to save the entity
        return familyTreeRepository.save(familyTree);
    }


}