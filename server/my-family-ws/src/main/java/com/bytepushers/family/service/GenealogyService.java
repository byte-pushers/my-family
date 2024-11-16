package com.bytepushers.family.service;

import com.bytepushers.family.model.FamilyMember;
import com.bytepushers.family.repo.FamilyMemberRepository;
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

    /**
     * Constructs a new {@link GenealogyService} with the specified {@link FamilyMemberRepository}.
     *
     * @param familyMemberRepository the repository for family member persistence
     */
    @Autowired
    public GenealogyService(FamilyMemberRepository familyMemberRepository) {
        this.familyMemberRepository = familyMemberRepository;
    }

    /**
     * Creates a family tree by saving the provided list of family members.
     * <p>
     * This method recursively saves all family members and their nested members,
     * flattening the hierarchy into a single list of saved entities.
     * </p>
     *
     * @param topLevelFamilyMembers the list of root family members to create
     * @return a flattened list of all saved family members
     * @throws IllegalArgumentException if the provided list is null
     */
    @Transactional
    @Override
    public List<FamilyMember> createFamilyTree(List<FamilyMember> topLevelFamilyMembers/*, Long userId, Long familyTreeId*/) { // TODO: accept userId in this method.
        // TODO: Do validation check to make sure the userId is and actual user/person.  If not an existing user/person throw exception

        if (topLevelFamilyMembers == null) {
            throw new IllegalArgumentException("FamilyTree cannot be null");
        }

        // TODO: find user/person by id

        List<FamilyMember> savedFamilyMembers = new ArrayList<>();
        for (FamilyMember topLevelFamilyMember : topLevelFamilyMembers) {
            // TODO: assign user to the top level family member.
            FamilyMember familyMember = saveFamilyMember(topLevelFamilyMember); // Save root and nested members
            saveFamilyMemberChildren(familyMember);

            savedFamilyMembers.addAll(flattenFamilyMembers(topLevelFamilyMember)); // Flatten hierarchy
        }
        return savedFamilyMembers;
    }

    /**
     * Recursively saves a family member and its nested family members.
     *
     * @param member   the family member to save
     * @param parentId
     */
    private FamilyMember saveFamilyMember(FamilyMember member) {
        return familyMemberRepository.save(member);
    }

    private void saveFamilyMemberChildren(FamilyMember parentFamilyMember) {
        if (parentFamilyMember.getPerson().getFamilyMembers() != null && parentFamilyMember.getPerson().getFamilyMembers().size() > 0) {
            for (FamilyMember familyMemberChild : parentFamilyMember.getPerson().getFamilyMembers()) {
                // nestedMember.setPerson(savedMember.getPerson());
                familyMemberChild.setParentId(parentFamilyMember.getId());
                FamilyMember savedChildFamilyMember = saveFamilyMember(familyMemberChild);
                familyMemberChild.setId(savedChildFamilyMember.getId());
                saveFamilyMemberChildren(familyMemberChild);
            }
        }
    }

    /**
     * Flattens a family member hierarchy into a single list.
     *
     * @param member the root family member
     * @return a flattened list of the family member and all its nested members
     */
    private List<FamilyMember> flattenFamilyMembers(FamilyMember member) {
        List<FamilyMember> flatList = new ArrayList<>();
        flatList.add(member);

        if (member.getPerson().getFamilyMembers() != null) {
            for (FamilyMember nestedMember : member.getPerson().getFamilyMembers()) {
                flatList.addAll(flattenFamilyMembers(nestedMember));
            }
        }
        return flatList;
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
        //TODO: we got to figure out how to use this.
        /*FamilyMember familyMember = familyMemberRepository.findById(id)
                .orElseThrow(() -> {
                    logger.warn("Family tree not found with ID: {}", id);
                    return new NotFoundException("Family tree not found with id: " + id);
                });*/
        //Initialize family members to ensure proper structure
        //initializeFamilyMembers(familyTree.getFamilyMembers());
        //TODO: eagly load to the family member
        //familyMember.getPerson().getFamilyMembers();
        //return familyTree;
    }
    /*private void initializeFamilyMembers(List<FamilyMember> members) {
        if (members != null) {
            for (Person member : members) {
                member.getFamilyMembers().size(); // Force initialization
                initializeFamilyMembers(member.getFamilyMembers());
            }
        }
    }*/
    /**
     * Retrieves all family members in the repository.
     *
     * @return a list of all family members
     */
    @Override
    public List<FamilyMember> getAllFamilyTrees() {
        return familyMemberRepository.findAll();
    }
    /*@Override
    @Transactional()
    public FamilyMember getFamilyMemberWithChildren(Long id) {
        return familyMemberRepository.findFamilyMemberWithChildren(id);
    }*/
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
    public FamilyMember updateFamilyTree(Long id, @jakarta.validation.Valid FamilyMember updatedFamilyMember) {
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