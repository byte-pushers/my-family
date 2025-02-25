package com.bytepushers.family.repo;

import com.bytepushers.family.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * The {@code OrderRepository} interface provides methods for accessing and
 * manipulating {@link Order} entities in the database. It extends {@link JpaRepository},
 * offering built-in functionality for CRUD operations on {@link Order} entities.
 * <p>This repository does not include any custom query methods but inherits all the
 * standard CRUD operations from {@link JpaRepository}.</p>
 *
 * @author Adish Timalsina
 * @see Order
 * @see JpaRepository
 */
@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

}
