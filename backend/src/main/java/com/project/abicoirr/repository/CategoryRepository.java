package com.project.abicoirr.repository;

import com.project.abicoirr.entity.CategoryEntity;
import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends AbstractRepository<CategoryEntity> {
  List<CategoryEntity> findByCategorynameContainingIgnoreCase(String categoryName);
}
