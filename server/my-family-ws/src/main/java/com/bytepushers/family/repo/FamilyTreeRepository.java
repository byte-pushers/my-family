package com.bytepushers.family.repo;

import com.bytepushers.family.model.FamilyMember;
import com.bytepushers.family.model.FamilyTree;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

@Repository
public interface FamilyTreeRepository extends JpaRepository<FamilyTree, Integer> {
    @Query("SELECT f FROM FamilyMember f LEFT JOIN FETCH f.familyMembers fm WHERE f.id = :id")
    FamilyMember findFamilyMemberWithChildren(@Param("id") Integer id);
}