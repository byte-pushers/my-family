<<<<<<<< HEAD:server/my-family-ws/src/main/java/com/bytepushers/family/familyTree/Repository/FamilyTreeRepository.java
package com.bytepushers.family.familyTree.Repository;

import com.bytepushers.family.familyTree.Model.FamilyTree;
========
package com.bytepushers.family.repo;

import com.bytepushers.family.model.FamilyTree;
>>>>>>>> cf6843c4efebfd72e41a49c2ebd81480725ba246:server/my-family-ws/src/main/java/com/bytepushers/family/repo/FamilyTreeRepository.java
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
