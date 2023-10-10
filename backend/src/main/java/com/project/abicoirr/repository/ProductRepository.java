package com.project.abicoirr.repository;

import com.project.abicoirr.entity.Category;
import com.project.abicoirr.entity.Product;
import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends AbstractRepository<Product> {

  List<Product> findByProductNameContainingIgnoreCase(String productName);

  List<Product> findByCategory(Category category);
}
