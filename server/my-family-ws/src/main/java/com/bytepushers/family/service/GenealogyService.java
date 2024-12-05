package com.bytepushers.family.service;

import com.bytepushers.family.model.FamilyMember;
import com.bytepushers.family.model.FamilyTree;
import com.bytepushers.family.repo.FamilyTreeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public abstract class GenealogyService implements FamilyTreeService {

    private final FamilyTreeRepository familyTreeRepository;

    @Autowired
    public GenealogyService(FamilyTreeRepository familyTreeRepository) {
        this.familyTreeRepository = familyTreeRepository;
    }

    @Override
    public String createFamilyTree(FamilyTree familyTree) {
        // Call repository to save the entity
        //return familyTreeRepository.save(familyTree);
        return "";
    }

    @Override
    public FamilyMember getFamilyMemberWithChildren(Integer id) {
        return null;
    }
}