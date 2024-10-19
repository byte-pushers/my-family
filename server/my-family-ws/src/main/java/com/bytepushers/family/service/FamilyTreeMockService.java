package com.bytepushers.family.service;

import com.bytepushers.family.model.BaseEntity;
import com.bytepushers.family.model.FamilyMember;
import com.bytepushers.family.model.FamilyTree;
import com.bytepushers.family.model.Person;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.concurrent.atomic.AtomicInteger;
@Service
public class FamilyTreeMockService implements FamilyTreeService {

    private final AtomicInteger idGenerator = new AtomicInteger(1);

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

    private void setAuditFields(BaseEntity entity) {
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

//@Service
//public class FamilyTreeMockService implements FamilyTreeService {
//
//    private final AtomicInteger idGenerator = new AtomicInteger(1);  // For generating unique IDs
//
//    public FamilyTreeMockService() {
//    }
//
//    @Override
//    public FamilyTree createFamilyTree(FamilyTree familyTree) {
//        // Assign a unique ID to the FamilyTree itself
//        familyTree.setId(idGenerator.getAndIncrement());
//
//        // Use BaseEntity's fields: createdBy, createdDate, updatedBy, and updatedDate
//        setAuditFields(familyTree);
//
//        // Iterate over family members and assign IDs, createdBy, and updatedBy fields recursively
//        if (familyTree.getFamilyMembers() != null) {
//            for (FamilyMember familyMember : familyTree.getFamilyMembers()) {
//                assignIdsAndSetAuditFields(familyMember);
//            }
//        }
//
//        return familyTree;
//    }
//
//    // Set createdBy, updatedBy, createdDate, and updatedDate for BaseEntity objects
//    private void setAuditFields(FamilyTree familyTree) {
//        if (familyTree.getCreatedBy() == null) {
//            familyTree.setCreatedBy("defaultUser");
//        }
//        if (familyTree.getCreatedDate() == null) {
//            familyTree.setCreatedDate(LocalDateTime.now());
//        }
//
//        // Set updated fields (always set updatedBy and updatedDate)
//        if (familyTree.getUpdatedBy() == null) {
//            familyTree.setUpdatedBy(familyTree.getCreatedBy());
//        }
//        familyTree.setUpdatedDate(LocalDateTime.now());
//    }
//
//    // Recursive method to assign IDs and set audit fields for family members
//    private void assignIdsAndSetAuditFields(FamilyMember familyMember) {
//        // Assign unique ID to the FamilyMember
//        familyMember.setId(idGenerator.getAndIncrement());
//
//        // Use BaseEntity's fields: createdBy, createdDate, updatedBy, and updatedDate
//        setAuditFields(familyMember);
//
//        // Assign ID to the Person object within the FamilyMember (if not already set)
//        if (familyMember.getPerson() != null) {
//            Person person = familyMember.getPerson();
//            if (person.getId() == null) {
//                person.setId(idGenerator.getAndIncrement());
//                // Set createdBy and updatedBy for person (BaseEntity fields)
//                setAuditFields(person);
//            }
//        }
//
//        // Recursively assign IDs and set audit fields for children if they exist
//        if (familyMember.getFamilyMembers() != null) {
//            for (FamilyMember child : familyMember.getFamilyMembers()) {
//                assignIdsAndSetAuditFields(child);  // Recursively assign IDs to child members
//            }
//        }
//    }
//
//    // Overloaded method to handle audit fields for FamilyMember and Person (BaseEntity objects)
//    private void setAuditFields(BaseEntity entity) {
//        if (entity.getCreatedBy() == null) {
//            entity.setCreatedBy("defaultUser");
//        }
//        if (entity.getCreatedDate() == null) {
//            entity.setCreatedDate(LocalDateTime.now());
//        }
//        if (entity.getUpdatedBy() == null) {
//            entity.setUpdatedBy(entity.getCreatedBy());
//        }
//        entity.setUpdatedDate(LocalDateTime.now());
//    }
//}
