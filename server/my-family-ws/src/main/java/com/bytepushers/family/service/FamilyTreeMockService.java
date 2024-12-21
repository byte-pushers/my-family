package com.bytepushers.family.service;

import com.bytepushers.family.model.BaseModel;
import com.bytepushers.family.model.FamilyMember;
import com.bytepushers.family.model.FamilyTree;
import com.bytepushers.family.model.Person;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
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
    public String createFamilyTree(FamilyTree familyTree) {
        /*familyTree.setId(idGenerator.getAndIncrement());
        setAuditFields(familyTree);

        if (familyTree.getFamilyMembers() != null) {
            for (FamilyMember familyMember : familyTree.getFamilyMembers()) {
                assignIdsAndSetAuditFields(familyMember);
            }
        }

        return familyTree;*/
        return """
            {
                "id": 1,
                "relationship": "Son",
                "person": null,
                "familyMembers": [
                    {
                        "relationship": "Father",
                        "person": {
                            "firstName": "John",
                            "lastName": "Doe",
                            "birthDate": "1970-01-01",
                            "gender": "Male",
                            "familyMembers": [
                                {
                                    "relationship": "Son",
                                    "person": {
                                        "firstName": "Mike",
                                        "lastName": "Doe",
                                        "birthDate": "2000-05-12",
                                        "gender": "Male",
                                        "familyMembers": [],
                                        "createdBy": "adminUser",
                                        "createdDate": "2024-10-16T10:00:00Z"
                                    },
                                    "createdBy": "adminUser",
                                    "createdDate": "2024-10-16T10:00:00Z"
                                },
                                {
                                    "relationship": "Daughter",
                                    "person": {
                                        "firstName": "Anna",
                                        "lastName": "Doe",
                                        "birthDate": "2005-08-20",
                                        "gender": "Female",
                                        "familyMembers": [
                                            {
                                                "relationship": "Daughter",
                                                "person": {
                                                    "firstName": "Emily",
                                                    "lastName": "Smith",
                                                    "birthDate": "2023-03-15",
                                                    "gender": "Female",
                                                    "familyMembers": [],
                                                    "createdBy": "adminUser",
                                                    "createdDate": "2024-10-16T10:00:00Z"
                                                },
                                                "createdBy": "adminUser",
                                                "createdDate": "2024-10-16T10:00:00Z"
                                            }
                                        ],
                                        "createdBy": "adminUser",
                                        "createdDate": "2024-10-16T10:00:00Z"
                                    },
                                    "createdBy": "adminUser",
                                    "createdDate": "2024-10-16T10:00:00Z"
                                }
                            ],
                            "createdBy": "adminUser",
                            "createdDate": "2024-10-16T10:00:00Z"
                        }
                    }
                ],
                "createdBy": "adminUser",
                "createdDate": "2024-10-16T10:00:00Z"
            }
        """;
    }

    /**
     * Retrieves a {@link FamilyTree} by its unique ID.
     * Currently returns null as this is a mock implementation.
     *
     * @param id the unique identifier of the family tree
     * @return the family tree, or null if not found
     */
    @Override
    public String getFamilyTree(Integer id) {
        return """
            {
                "id": 1,
                "relationship": "Son",
                "person": null,
                "familyMembers": [
                    {
                        "relationship": "Father",
                        "person": {
                            "firstName": "John",
                            "lastName": "Doe",
                            "birthDate": "1970-01-01",
                            "gender": "Male",
                            "familyMembers": [
                                {
                                    "relationship": "Son",
                                    "person": {
                                        "firstName": "Mike",
                                        "lastName": "Doe",
                                        "birthDate": "2000-05-12",
                                        "gender": "Male",
                                        "familyMembers": [],
                                        "createdBy": "adminUser",
                                        "createdDate": "2024-10-16T10:00:00Z"
                                    },
                                    "createdBy": "adminUser",
                                    "createdDate": "2024-10-16T10:00:00Z"
                                },
                                {
                                    "relationship": "Daughter",
                                    "person": {
                                        "firstName": "Anna",
                                        "lastName": "Doe",
                                        "birthDate": "2005-08-20",
                                        "gender": "Female",
                                        "familyMembers": [
                                            {
                                                "relationship": "Daughter",
                                                "person": {
                                                    "firstName": "Emily",
                                                    "lastName": "Smith",
                                                    "birthDate": "2023-03-15",
                                                    "gender": "Female",
                                                    "familyMembers": [],
                                                    "createdBy": "adminUser",
                                                    "createdDate": "2024-10-16T10:00:00Z"
                                                },
                                                "createdBy": "adminUser",
                                                "createdDate": "2024-10-16T10:00:00Z"
                                            }
                                        ],
                                        "createdBy": "adminUser",
                                        "createdDate": "2024-10-16T10:00:00Z"
                                    },
                                    "createdBy": "adminUser",
                                    "createdDate": "2024-10-16T10:00:00Z"
                                }
                            ],
                            "createdBy": "adminUser",
                            "createdDate": "2024-10-16T10:00:00Z"
                        }
                    }
                ],
                "createdBy": "adminUser",
                "createdDate": "2024-10-16T10:00:00Z"
            }
        """;
    }

    /**
     * Retrieves a {@link FamilyMember} along with its child members by the member's unique ID.
     * Currently returns null as this is a mock implementation.
     *
     * @param id the unique identifier of the family member
     * @return the family member with its child members, or null if not found
     */
    @Override
    public FamilyMember getFamilyMemberWithChildren(Integer id) {
        return null; // Not implemented for mock service.
    }

    /**
     * Assigns unique IDs and sets audit fields for a {@link FamilyMember} and its related entities.
     * Recursively processes child members and their associated {@link Person}.
     *
     * @param familyMember the family member to process
     */
    private void assignIdsAndSetAuditFields(FamilyMember familyMember) {
        familyMember.setId(idGenerator.getAndIncrement());
        setAuditFields(familyMember);

        if (familyMember.getPerson() != null) {
            Person person = familyMember.getPerson();
            person.setId(idGenerator.getAndIncrement());
            setAuditFields(person);
        }

        if (familyMember.getFamilyMembers() != null) {
            for (FamilyMember child : familyMember.getFamilyMembers()) {
                assignIdsAndSetAuditFields(child);
            }
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
            entity.setCreatedDate(LocalDateTime.now());
        }
        if (entity.getUpdatedBy() == null) {
            entity.setUpdatedBy(entity.getCreatedBy());
        }
        entity.setUpdatedDate(LocalDateTime.now());
    }
}
