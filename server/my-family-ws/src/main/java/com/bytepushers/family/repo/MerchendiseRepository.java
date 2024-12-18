package com.bytepushers.family.repo;

import com.bytepushers.family.model.Merchandise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.stereotype.Repository;

@NoRepositoryBean
public interface MerchendiseRepository extends BaseItemRepository {
}
