package com.bytepushers.family.repo;

import com.bytepushers.family.model.FamilyMember;
import com.bytepushers.family.model.FamilyTree;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
/**
 * Repository interface for managing {@link FamilyTree} entities.
 * Extends {@link JpaRepository} to provide CRUD operations and custom query methods.
 */
@Repository
public interface FamilyTreeRepository extends JpaRepository<FamilyTree, Integer> {

    /**
     * Finds a {@link FamilyMember} with its associated child members.
     * Uses a JPQL query with a left join fetch to retrieve the family member and initialize its child collection.
     *
     * @param id the unique identifier of the family member
     * @return the {@link FamilyMember} with its child members
     */
    @Query("SELECT f FROM FamilyMember f LEFT JOIN FETCH f.familyMembers fm WHERE f.id = :id")
    FamilyMember findFamilyMemberWithChildren(@Param("id") Integer id);
}
