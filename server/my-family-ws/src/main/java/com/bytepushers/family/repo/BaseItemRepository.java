package com.bytepushers.family.repo;

import com.bytepushers.family.model.BaseItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface BaseItemRepository extends JpaRepository<BaseItem, Long> {
}
