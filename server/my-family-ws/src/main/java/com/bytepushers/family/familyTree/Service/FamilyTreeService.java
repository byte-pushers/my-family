<<<<<<<< HEAD:server/my-family-ws/src/main/java/com/bytepushers/family/familyTree/Service/FamilyTreeService.java
package com.bytepushers.family.familyTree.Service;

import com.bytepushers.family.familyTree.Model.FamilyTree;
========
package com.bytepushers.family.service;

import com.bytepushers.family.model.FamilyTree;
>>>>>>>> cf6843c4efebfd72e41a49c2ebd81480725ba246:server/my-family-ws/src/main/java/com/bytepushers/family/service/FamilyTreeService.java
import jakarta.validation.Valid;

public interface FamilyTreeService {
    FamilyTree createFamilyTree(@Valid FamilyTree familyTree);
    FamilyTree getFamilyTreeById(Long id);
    boolean deleteFamilyTree(Long id);
    FamilyTree updateFamilyTree(Long id, @Valid FamilyTree updatedFamilyTree);
}
