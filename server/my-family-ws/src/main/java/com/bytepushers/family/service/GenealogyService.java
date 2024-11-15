package com.bytepushers.family.service;

import com.bytepushers.family.model.FamilyMember;
import com.bytepushers.family.model.FamilyTree;
import com.bytepushers.family.repo.FamilyMemberRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service("familyTreeService")
public class GenealogyService implements FamilyTreeService {

    private final FamilyMemberRepository familyMemberRepository;

    @Autowired
    public GenealogyService(FamilyMemberRepository familyMemberRepository) {
        this.familyMemberRepository = familyMemberRepository;
    }

    // CREATE
    @Transactional
    @Override
    public List<FamilyMember> createFamilyTree(List<FamilyMember> familyMembers) {
        if (familyMembers == null) {
            throw new IllegalArgumentException("FamilyTree cannot be null");
        }

        List<FamilyMember> savedFamilyMembers = new ArrayList<>();
        for (FamilyMember member : familyMembers) {
            // Start the recursive save for each root family member
            saveFamilyMemberRecursive(member);
            // Flatten the hierarchy into a single list
            savedFamilyMembers.addAll(flattenFamilyMembers(member));
        }
        return savedFamilyMembers;
    }

    private void saveFamilyMemberRecursive(FamilyMember member) {
        // Save the current family member to persist it and generate an ID
        FamilyMember savedMember = familyMemberRepository.save(member);

        // Check for nested family members and associate them with the current person
        if (member.getPerson().getFamilyMembers() != null) {
            for (FamilyMember nestedMember : member.getPerson().getFamilyMembers()) {
                // Set the nested member's person reference to the parent
                nestedMember.setPerson(savedMember.getPerson());

                // Recursively save each nested member
                saveFamilyMemberRecursive(nestedMember);
            }
        }
    }

    private List<FamilyMember> flattenFamilyMembers(FamilyMember member) {
        List<FamilyMember> flatList = new ArrayList<>();
        flatList.add(member); // Add the current member to the list

        // If the person has nested family members, add them recursively
        if (member.getPerson().getFamilyMembers() != null) {
            for (FamilyMember nestedMember : member.getPerson().getFamilyMembers()) {
                flatList.addAll(flattenFamilyMembers(nestedMember));
            }
        }
        return flatList;
    }
}

/*
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

