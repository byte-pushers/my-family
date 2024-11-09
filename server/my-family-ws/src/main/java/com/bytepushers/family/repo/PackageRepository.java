package com.bytepushers.family.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface PackageRepository extends JpaRepository<Package, Long> {
}
