package com.project.abicoirr.repository;

import com.project.abicoirr.entity.Category;
import com.project.abicoirr.entity.Product;
import jakarta.transaction.Transactional;
import java.util.List;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends AbstractRepository<Product> {

  List<Product> findByProductNameContainingIgnoreCase(String productName);

  List<Product> findByCategory(Category category);

  @Transactional
  @Modifying
  @Query(value = "DELETE FROM product WHERE id = :productId", nativeQuery = true)
  void deleteProduct(long productId);
}
