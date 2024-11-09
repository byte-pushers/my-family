package com.bytepushers.family.service;

import com.bytepushers.family.model.FamilyMember;
import com.bytepushers.family.model.FamilyTree;
import com.bytepushers.family.repo.FamilyMemberRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service("familyTreeService")
public class GenealogyService implements FamilyTreeService {

    private final FamilyMemberRepository familyMemberRepository;

    @Autowired
    public GenealogyService(FamilyMemberRepository familyMemberRepository) {
        this.familyMemberRepository = familyMemberRepository;
    }
    //CREATE
    @Transactional // not sure yet if we should use this but it might be a good idea
    @Override
    public List<FamilyMember> createFamilyTree(List<FamilyMember> familyMembers) {
        // Call repository to save the entity
        if(familyMembers == null){
            throw  new IllegalArgumentException("FamilyTree cannot be null");
        }
        return familyMemberRepository.save(familyMembers);
    }/*
    // READ (Get by ID)
    @Override
    public Optional<FamilyMember> getFamilyTreeById(long id) {
        return familyMemberRepository.findById(id);
    }
    // READ (Get All)
    @Override
    public List<FamilyMember> getAllFamilyTrees() {
        return familyMemberRepository.findAll();
    }

    // UPDATE
    @Transactional
    @Override
    public FamilyTree updateFamilyTree(long id, FamilyTree updatedFamilyTree) {
        return familyMemberRepository.findById(id)
                .map(existingTree -> {
                    existingTree.setCrestImageUrl(updatedFamilyTree.getCrestImageUrl());
                    existingTree.setFamilyMembers(updatedFamilyTree.getFamilyMembers());
                    return familyMemberRepository.save(existingTree);
                })
                .orElseThrow(() -> new RuntimeException("FamilyTree with id " + id + " not found"));
    }
    // DELETE
    @Transactional
    @Override
    public void deleteFamilyTree(long id) {
        if (!familyMemberRepository.existsById(id)) {
            throw new RuntimeException("FamilyTree with id " + id + " not found");
        }
        familyMemberRepository.deleteById(id);
    }*/

}