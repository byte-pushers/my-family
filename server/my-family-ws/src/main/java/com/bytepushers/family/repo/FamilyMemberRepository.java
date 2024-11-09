package com.bytepushers.family.repo;

import com.bytepushers.family.model.FamilyMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FamilyMemberRepository extends JpaRepository<List<FamilyMember>, Long> {
}