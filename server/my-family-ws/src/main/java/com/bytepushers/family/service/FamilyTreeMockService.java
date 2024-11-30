package com.bytepushers.family.service;

import com.bytepushers.family.model.BaseModel;
import com.bytepushers.family.model.FamilyMember;
import com.bytepushers.family.model.FamilyTree;
import com.bytepushers.family.model.Person;
// import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class FamilyTreeMockService implements FamilyTreeService {

    private final AtomicLong idGenerator = new AtomicLong(1);

    @Override
    public FamilyTree createFamilyTree(FamilyTree familyTree) {
        familyTree.setId(idGenerator.getAndIncrement());
        setAuditFields(familyTree);

        if (familyTree.getFamilyMembers() != null) {
            for (FamilyMember familyMember : familyTree.getFamilyMembers()) {
                assignIdsAndSetAuditFields(familyMember);
            }
        }

        return familyTree;
    }

    @Override
    public String getFamilyTree(Integer id) {
        return """
            {
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

    @Override
    public FamilyMember getFamilyMemberWithChildren(Integer id) {
        return null;
    }

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