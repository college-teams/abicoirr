package com.project.abicoirr.repository;

import com.project.abicoirr.entity.CategoryEntity;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {
	List<CategoryEntity> findByCategorynameContainingIgnoreCase(String categoryName);

}
