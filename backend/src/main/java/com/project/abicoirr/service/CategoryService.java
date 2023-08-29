package com.project.abicoirr.service;

import com.project.abicoirr.entity.CategoryEntity;

public interface CategoryService {

  public CategoryEntity saveCategory(CategoryEntity category);

  public CategoryEntity getCategoryById(Long categoryId);

  public CategoryEntity updateCategoryById(Long categoryId, CategoryEntity category);

  public void deleteCategoryById(Long categoryId);
}
