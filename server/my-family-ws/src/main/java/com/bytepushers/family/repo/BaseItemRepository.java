package com.bytepushers.family.repo;

import com.bytepushers.family.model.BaseItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

/**
 * The {@code BaseItemRepository} interface provides basic CRUD operations
 * for managing {@link BaseItem} entities in the database. This interface
 * extends {@link JpaRepository} to provide out-of-the-box functionality
 * for the persistence layer.
 * <p>It is marked with {@link NoRepositoryBean}, indicating that this is a
 * base interface for other repositories that work with specific types of
 * {@link BaseItem} subclasses, rather than a standalone repository. The
 * actual implementation of this repository will be handled by Spring Data JPA
 * for any concrete subclasses of {@link BaseItem}.</p>
 *
 * @param <T> the type of the entity to be persisted, which must extend {@link BaseItem}.
 *
 * @see BaseItem
 * @see JpaRepository
 *
 * @author Adish Timalsina
 */
@NoRepositoryBean
public interface BaseItemRepository extends JpaRepository<BaseItem, Long> {
}
