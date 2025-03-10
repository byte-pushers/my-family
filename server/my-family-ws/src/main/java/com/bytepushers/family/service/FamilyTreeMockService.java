package com.bytepushers.family.service;

import com.bytepushers.family.model.BaseModel;
import com.bytepushers.family.model.FamilyTree;
import com.bytepushers.family.model.Person;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.concurrent.atomic.AtomicLong;

/**
 * Mock service implementation of the {@link FamilyTreeService} interface.
 * Provides in-memory logic for creating and managing {@link FamilyTree} and {@link FamilyMember} entities.
 * This service is intended for testing or development purposes where a full database setup is not required.
 */
@Service
public class FamilyTreeMockService implements FamilyTreeService {

    /** An atomic counter for generating unique IDs for family tree entities. */
    private final AtomicLong idGenerator = new AtomicLong(1);

    /**
     * Creates a new {@link FamilyTree} with unique IDs and audit fields.
     * Assigns unique IDs to the family tree and its members recursively.
     *
     * @param familyTree the family tree to create
     * @return the created family tree with assigned IDs and audit fields
     */
    @Override
    public FamilyTree createFamilyTree(Long userId, FamilyTree familyTree) {
        familyTree.setId(idGenerator.getAndIncrement());
        setAuditFields(familyTree);

        if (familyTree.getPeople() != null) {
            for (Person familyMember : familyTree.getPeople()) {
                assignIdsAndSetAuditFields(familyMember);
            }
        }

        return familyTree;
    }

    /**
     * Retrieves a {@link FamilyTree} by its unique ID.
     * Currently returns null as this is a mock implementation.
     *
     * @param id the unique identifier of the family tree
     * @return the family tree, or null if not found
     */
    @Override
    public FamilyTree getFamilyTree(Long id) {
        return null;
    }

    @Override
    public FamilyTree updateFamilyTree(Long userId, FamilyTree familyTree) {
        return null;
    }

    @Override
    public String deleteFamilyTree(Long id) {
        return null;
    }

    /**
     * Assigns unique IDs and sets audit fields for a {@link FamilyMember} and its related entities.
     * Recursively processes child members and their associated {@link Person}.
     *
     * @param familyMember the family member to process
     */
    private void assignIdsAndSetAuditFields(Person person) {
        person.setId(idGenerator.getAndIncrement());
        setAuditFields(person);

        if (person != null) {
            person.setId(idGenerator.getAndIncrement());
            setAuditFields(person);

            /*if (person.getFamilyMembers() != null && person.getFamilyMembers().size() > 0) {
                for (FamilyMember child : person.getFamilyMembers()) {
                    assignIdsAndSetAuditFields(child);
                }
            }*/
        }


    }

    /**
     * Sets audit fields such as created and updated timestamps and user information
     * for a given {@link BaseModel} entity.
     * Ensures that fields are populated with default values if not already set.
     *
     * @param entity the entity for which to set audit fields
     */
    private void setAuditFields(BaseModel entity) {
        if (entity.getCreatedBy() == null) {
            entity.setCreatedBy("defaultUser");
        }
        if (entity.getCreatedDate() == null) {
            entity.setCreatedDate( new Date());
        }
        if (entity.getUpdatedBy() == null) {
            entity.setUpdatedBy(entity.getCreatedBy());
        }
        if (entity.getUpdatedDate() == null) {
            entity.setUpdatedDate( new Date());
        }
        //entity.setUpdatedDate(new Date());
    }
}