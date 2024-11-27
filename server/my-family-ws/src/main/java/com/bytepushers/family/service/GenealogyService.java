package com.bytepushers.family.service;

import com.bytepushers.family.model.FamilyMember;
import com.bytepushers.family.model.FamilyTree;
import com.bytepushers.family.model.User;
import com.bytepushers.family.repo.FamilyMemberRepository;
import com.bytepushers.family.repo.UserRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * Service implementation for managing family trees.
 * <p>
 * This class provides the core business logic for creating, retrieving, updating,
 * and deleting family tree data. It interacts with the {@link FamilyMemberRepository}
 * to persist family tree entities and handles complex operations such as recursive saving.
 * </p>
 */
@Service("familyTreeService")
public class GenealogyService implements FamilyTreeService {
    private static final Logger logger = LoggerFactory.getLogger(GenealogyService.class);

    private final FamilyMemberRepository familyMemberRepository;
    private final UserRepository userRepository;

    /**
     * Constructs a new {@link GenealogyService} with the specified repositories.
     *
     * @param familyMemberRepository the repository for family member persistence
     * @param userRepository         the repository for user persistence
     */
    @Autowired
    public GenealogyService(FamilyMemberRepository familyMemberRepository, UserRepository userRepository) {
        this.familyMemberRepository = familyMemberRepository;
        this.userRepository = userRepository;
    }

    /**
     * Creates a family tree by saving the provided list of family members.
     * This method validates the userId and familyTreeId, saves all family members recursively,
     * and flattens the hierarchy into a single list of saved entities.
     *
     * @param topLevelFamilyMembers the list of root family members to create
     * @param userId                the ID of the user associated with the family tree
     * @param familyTreeId          the ID of the family tree (null for new trees)
     * @return a flattened list of all saved family members
     * @throws IllegalArgumentException if the provided list is null, empty, or userId is invalid
     */
    @Transactional
    @Override
    public List<FamilyMember> createFamilyTree(List<FamilyMember> topLevelFamilyMembers, Long userId, Long familyTreeId) {
        if (topLevelFamilyMembers == null || topLevelFamilyMembers.isEmpty()) {
            throw new IllegalArgumentException("Family tree cannot be null or empty.");
        }

        // Validate userId
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            logger.error("User with ID {} not found. Cannot create family tree.", userId);
            throw new IllegalArgumentException("Invalid userId: User does not exist.");
        }

        List<FamilyMember> savedFamilyMembers = new ArrayList<>();

        for (FamilyMember topLevelFamilyMember : topLevelFamilyMembers) {
            // Assign userId and familyTreeId to the top-level family member
            topLevelFamilyMember.setCreatedBy(String.valueOf(userId));
            topLevelFamilyMember.setFamilyTreeId(familyTreeId);

            // Save the top-level family member
            FamilyMember savedFamilyMember = saveFamilyMember(topLevelFamilyMember);

            // Save the children of the top-level family member recursively
            saveFamilyMemberChildren(savedFamilyMember);

            // Flatten and collect all family members (top-level + children)
            savedFamilyMembers.addAll(flattenFamilyMembers(savedFamilyMember));
        }

        logger.info("Successfully created family tree for user ID {} with {} members.", userId, savedFamilyMembers.size());
        return savedFamilyMembers;
    }

    /**
     * Recursively saves a family member and its nested family members.
     *
     * @param parentFamilyMember the family member whose children need to be saved
     */
    private void saveFamilyMemberChildren(FamilyMember parentFamilyMember) {
        if (parentFamilyMember.getPerson().getFamilyMembers() != null &&
                !parentFamilyMember.getPerson().getFamilyMembers().isEmpty()) {
            for (FamilyMember child : parentFamilyMember.getPerson().getFamilyMembers()) {
                // Set parent reference
                child.setParentId(parentFamilyMember.getId());
                child.setCreatedBy(parentFamilyMember.getCreatedBy());
                child.setFamilyTreeId(parentFamilyMember.getFamilyTreeId());

                // Save child member
                FamilyMember savedChild = saveFamilyMember(child);

                // Recursively save nested children
                saveFamilyMemberChildren(savedChild);
            }
        }
    }

    /**
     * Saves a family member to the repository.
     *
     * @param member the family member to save
     * @return the saved family member entity
     */
    private FamilyMember saveFamilyMember(FamilyMember member) {
        try {
            return familyMemberRepository.save(member);
        } catch (Exception e) {
            logger.error("Failed to save family member: {}", e.getMessage());
            throw new RuntimeException("Error while saving family member. Please try again.", e);
        }
    }

    /**
     * Retrieves a family member by its ID.
     *
     * @param id the ID of the family member to retrieve
     * @return an {@link Optional} containing the family member if found, or empty if not
     */
    @Override
    public Optional<FamilyMember> getFamilyTreeById(Long id) {
        return familyMemberRepository.findById(id);
    }

    /**
     * Retrieves all family members in the repository.
     *
     * @return a list of all family members
     */
    @Override
    public List<FamilyMember> getAllFamilyTrees() {
        return familyMemberRepository.findAll();
    }

    /**
     * Updates an existing family member.
     *
     * @param id                  the ID of the family member to update
     * @param updatedFamilyMember the updated family member data
     * @return the updated family member
     * @throws RuntimeException if the family member with the specified ID is not found
     */
    @Override
    @Transactional
    public FamilyMember updateFamilyTree(Long id, FamilyMember updatedFamilyMember) {
        return familyMemberRepository.findById(id)
                .map(existingMember -> {
                    if (updatedFamilyMember.getPerson() != null) {
                        existingMember.setPerson(updatedFamilyMember.getPerson());
                    }
                    if (updatedFamilyMember.getPerson().getFamilyMembers() != null) {
                        existingMember.getPerson().setFamilyMembers(updatedFamilyMember.getPerson().getFamilyMembers());
                    }
                    return familyMemberRepository.save(existingMember);
                })
                .orElseThrow(() -> new RuntimeException("FamilyMember with id " + id + " not found"));
    }

    /**
     * Deletes a family member by its ID.
     *
     * @param id the ID of the family member to delete
     * @throws RuntimeException if the family member with the specified ID is not found
     */
    @Transactional
    @Override
    public void deleteFamilyTree(Long id) {
        if (!familyMemberRepository.existsById(id)) {
            throw new RuntimeException("FamilyTree with id " + id + " not found");
        }
        familyMemberRepository.deleteById(id);
    }
}
