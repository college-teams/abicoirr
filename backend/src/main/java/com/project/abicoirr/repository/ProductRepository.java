package com.project.abicoirr.repository;

import com.project.abicoirr.entity.CategoryEntity;
import com.project.abicoirr.entity.Product;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

	List<Product> findByProductNameContainingIgnoreCase(String keyword);

	List<Product> findByCategory(CategoryEntity category);
}
