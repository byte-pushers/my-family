package com.bytepushers.family.service;

import com.bytepushers.family.exception.NotFoundException;
import com.bytepushers.family.model.FamilyMember;
import com.bytepushers.family.model.FamilyTree;
import com.bytepushers.family.model.Person;
import com.bytepushers.family.repo.FamilyTreeRepository;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class FamilyTreeServiceImpl implements FamilyTreeService {
    private static final Logger logger = LoggerFactory.getLogger(FamilyTreeServiceImpl.class);

    private final FamilyTreeRepository familyTreeRepository;

    @Autowired
    public FamilyTreeServiceImpl(FamilyTreeRepository familyTreeRepository) {
        this.familyTreeRepository = familyTreeRepository;
    }

    @Override
    @Transactional
    public FamilyTree createFamilyTree(@Valid FamilyTree familyTree) {
        logger.debug("Creating new family tree");

        // Set audit fields
        if (familyTree.getCreatedBy() == null) {
            familyTree.setCreatedBy("defaultUser");
        }
        if (familyTree.getCreatedDate() == null) {
            familyTree.setCreatedDate(LocalDateTime.now());
        }

        // Process each family member and set the family tree reference
        if (familyTree.getFamilyMembers() != null) {
            for (FamilyMember rootMember : familyTree.getFamilyMembers()) {
                processFamilyMember(rootMember, familyTree, null); // Top-level members have no parent
            }
        }

        // Save and return
        FamilyTree savedTree = familyTreeRepository.save(familyTree);
        logger.info("Created family tree with ID: {}", savedTree.getId());
        return savedTree;
    }

    @Override
    @Transactional(readOnly = true)
    public String getFamilyTree(Integer id) {
        logger.info("Retrieving family tree with ID: {}", id);
        FamilyTree familyTree = familyTreeRepository.findById(id)
                .orElseThrow(() -> {
                    logger.warn("Family tree not found with ID: {}", id);
                    return new NotFoundException("Family tree not found with id: " + id);
                });

        // Initialize family members to ensure proper structure
        initializeFamilyMembers(familyTree.getFamilyMembers());

        return ""; // familyTree;
    }

    @Override
    @Transactional(readOnly = true)
    public FamilyMember getFamilyMemberWithChildren(Integer id) {
        return familyTreeRepository.findFamilyMemberWithChildren(id);
    }

    private void initializeFamilyMembers(List<FamilyMember> members) {
        if (members != null) {
            for (FamilyMember member : members) {
                member.getFamilyMembers().size(); // Force initialization
                initializeFamilyMembers(member.getFamilyMembers());
            }
        }
    }


    private void processFamilyMember(FamilyMember member, FamilyTree familyTree, FamilyMember parent) {
        logger.debug("Processing family member with relationship: {}", member.getRelationship());

        // Set the family tree reference
        member.setFamilyTree(familyTree);

        // Set the parent reference if present
        if (parent != null) {
            member.setParent(parent);
            if (!parent.getFamilyMembers().contains(member)) { // Prevent duplicate additions
                parent.getFamilyMembers().add(member);
            }
        }

        // Set audit fields
        if (member.getCreatedBy() == null) {
            member.setCreatedBy("defaultUser");
        }
        if (member.getCreatedDate() == null) {
            member.setCreatedDate(LocalDateTime.now());
        }

        // Process the person entity
        if (member.getPerson() != null) {
            Person person = member.getPerson();
            if (person.getCreatedBy() == null) {
                person.setCreatedBy(member.getCreatedBy());
            }
            if (person.getCreatedDate() == null) {
                person.setCreatedDate(member.getCreatedDate());
            }
        }

        // Recursively process child members using a copy of the list
        if (member.getFamilyMembers() != null) {
            List<FamilyMember> childMembers = new ArrayList<>(member.getFamilyMembers());
            member.getFamilyMembers().clear(); // Clear to avoid duplicate additions during recursion
            for (FamilyMember child : childMembers) {
                processFamilyMember(child, familyTree, member);
            }
        }
        logger.debug("Family tree ID set for member: {}", familyTree.getId());
    }



}