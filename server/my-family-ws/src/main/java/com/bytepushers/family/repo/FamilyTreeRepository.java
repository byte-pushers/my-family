package com.bytepushers.family.repo;

import com.bytepushers.family.model.FamilyTree;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for managing {@link FamilyTree} entities.
 * Extends {@link JpaRepository} to provide CRUD operations and custom query methods.
 */
@Repository
public interface FamilyTreeRepository extends JpaRepository<FamilyTree, Long> {

}