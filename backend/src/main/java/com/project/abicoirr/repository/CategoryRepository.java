package com.project.abicoirr.repository;

import com.project.abicoirr.entity.Category;
import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends AbstractRepository<Category> {
  List<Category> findByCategorynameContainingIgnoreCase(String categoryName);
}
