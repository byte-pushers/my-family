package com.bytepushers.family.service;

import com.bytepushers.family.model.BaseEntity;
import com.bytepushers.family.model.FamilyMember;
import com.bytepushers.family.model.FamilyTree;
import com.bytepushers.family.model.Person;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.concurrent.atomic.AtomicInteger;
@Service
@Profile("test")// Only active in test profile
public abstract class FamilyTreeMockService implements FamilyTreeService {

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