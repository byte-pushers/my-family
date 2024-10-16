package com.bytepushers.family.familyTree.Repository;

import com.bytepushers.family.familyTree.Model.FamilyTree;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FamilyTreeRepository extends JpaRepository<FamilyTree, Long> {
    // method to find by parentName
    List<FamilyTree> findByParentName(String parentName);
    Optional<FamilyTree> findByEmail(String email);
}
