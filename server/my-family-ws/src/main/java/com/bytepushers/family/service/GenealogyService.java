package com.bytepushers.family.service;

import com.bytepushers.family.model.FamilyTree;
import com.bytepushers.family.repo.FamilyTreeRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service("familyTreeService")
public class GenealogyService implements FamilyTreeService {

    private final FamilyTreeRepository familyTreeRepository;

    @Autowired
    public GenealogyService(FamilyTreeRepository familyTreeRepository) {
        this.familyTreeRepository = familyTreeRepository;
    }
    //CREATE
    @Transactional // not sure yet if we should use this but it might be a good idea
    @Override
    public FamilyTree createFamilyTree(FamilyTree familyTree) {
        // Call repository to save the entity
        if(familyTree == null){
            throw  new IllegalArgumentException("FamilyTree cannot be null");
        }
        return familyTreeRepository.save(familyTree);
    }
    // READ (Get by ID)
    @Override
    public Optional<FamilyTree> getFamilyTreeById(long id) {
        return familyTreeRepository.findById(id);
    }
    // READ (Get All)
    @Override
    public List<FamilyTree> getAllFamilyTrees() {
        return familyTreeRepository.findAll();
    }

    // UPDATE
    @Transactional
    @Override
    public FamilyTree updateFamilyTree(long id, FamilyTree updatedFamilyTree) {
        return familyTreeRepository.findById(id)
                .map(existingTree -> {
                    existingTree.setCrestImageUrl(updatedFamilyTree.getCrestImageUrl());
                    existingTree.setFamilyMembers(updatedFamilyTree.getFamilyMembers());
                    return familyTreeRepository.save(existingTree);
                })
                .orElseThrow(() -> new RuntimeException("FamilyTree with id " + id + " not found"));
    }
    // DELETE
    @Transactional
    @Override
    public void deleteFamilyTree(long id) {
        if (!familyTreeRepository.existsById(id)) {
            throw new RuntimeException("FamilyTree with id " + id + " not found");
        }
        familyTreeRepository.deleteById(id);
    }

}