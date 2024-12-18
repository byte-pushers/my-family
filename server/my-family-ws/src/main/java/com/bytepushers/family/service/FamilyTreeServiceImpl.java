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

/**
 * Implementation of the {@link FamilyTreeService} interface.
 * Provides transactional methods for creating and retrieving {@link FamilyTree} and {@link FamilyMember} entities.
 * Handles recursive family tree processing and ensures proper audit fields are set.
 */
@Service
public class FamilyTreeServiceImpl implements FamilyTreeService {

    /** Logger for logging service operations. */
    private static final Logger logger = LoggerFactory.getLogger(FamilyTreeServiceImpl.class);

    /** Repository for managing {@link FamilyTree} entities. */
    private final FamilyTreeRepository familyTreeRepository;

    /**
     * Constructs a new FamilyTreeServiceImpl with the specified repository.
     *
     * @param familyTreeRepository the repository for family tree operations
     */
    @Autowired
    public FamilyTreeServiceImpl(FamilyTreeRepository familyTreeRepository) {
        this.familyTreeRepository = familyTreeRepository;
    }

    /**
     * Creates a new {@link FamilyTree}, setting unique audit fields and processing its members recursively.
     *
     * @param familyTree the family tree to create
     * @return the created family tree with all members processed and saved
     */
    @Override
    @Transactional
    public String createFamilyTree(@Valid FamilyTree familyTree) {
        logger.debug("Creating new family tree");

        // Set audit fields
        if (familyTree.getCreatedBy() == null) {
            familyTree.setCreatedBy("defaultUser");
        }
        if (familyTree.getCreatedDate() == null) {
            familyTree.setCreatedDate(LocalDateTime.now());
        }

        // Process each family member
        if (familyTree.getFamilyMembers() != null) {
            for (FamilyMember rootMember : familyTree.getFamilyMembers()) {
                processFamilyMember(rootMember, familyTree, null);
            }
        }

        FamilyTree savedTree = familyTreeRepository.save(familyTree);
        logger.info("Created family tree with ID: {}", savedTree.getId());
        return ""; // savedTree;
    }

    /**
     * Retrieves a {@link FamilyTree} by its unique ID, ensuring all family members are properly initialized.
     *
     * @param id the unique identifier of the family tree
     * @return the family tree, or throws a {@link NotFoundException} if not found
     */
    @Override
    @Transactional(readOnly = true)
    public String getFamilyTree(Integer id) {
        logger.info("Retrieving family tree with ID: {}", id);
        FamilyTree familyTree = familyTreeRepository.findById(id)
                .orElseThrow(() -> {
                    logger.warn("Family tree not found with ID: {}", id);
                    return new NotFoundException("Family tree not found with id: " + id);
                });

        initializeFamilyMembers(familyTree.getFamilyMembers());
        return familyTree;
    }

    /**
     * Retrieves a {@link FamilyMember} along with its child members by the member's unique ID.
     *
     * @param id the unique identifier of the family member
     * @return the {@link FamilyMember} with its child members, or null if not found
     */
    @Override
    @Transactional(readOnly = true)
    public FamilyMember getFamilyMemberWithChildren(Integer id) {
        return familyTreeRepository.findFamilyMemberWithChildren(id);
    }

    /**
     * Recursively initializes the family members to ensure proper structure.
     *
     * @param members the list of family members to initialize
     */
    private void initializeFamilyMembers(List<FamilyMember> members) {
        if (members != null) {
            for (FamilyMember member : members) {
                member.getFamilyMembers().size(); // Force initialization
                initializeFamilyMembers(member.getFamilyMembers());
            }
        }
    }

    /**
     * Recursively processes a {@link FamilyMember}, setting audit fields, family tree references,
     * parent relationships, and processing child members.
     *
     * @param member     the family member to process
     * @param familyTree the family tree the member belongs to
     * @param parent     the parent family member, or null if this is a root member
     */
    private void processFamilyMember(FamilyMember member, FamilyTree familyTree, FamilyMember parent) {
        logger.debug("Processing family member with relationship: {}", member.getRelationship());

        // Set the family tree reference
        member.setFamilyTree(familyTree);

        // Set the parent reference if present
        if (parent != null) {
            member.setParent(parent);
            if (!parent.getFamilyMembers().contains(member)) {
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

        // Recursively process child members
        if (member.getFamilyMembers() != null) {
            List<FamilyMember> childMembers = new ArrayList<>(member.getFamilyMembers());
            member.getFamilyMembers().clear();
            for (FamilyMember child : childMembers) {
                processFamilyMember(child, familyTree, member);
            }
        }
        logger.debug("Family tree ID set for member: {}", familyTree.getId());
    }
}
