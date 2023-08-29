package com.project.abicoirr.service;

import com.project.abicoirr.entity.CategoryEntity;
import com.project.abicoirr.repository.CategoryRepository;
import java.util.Objects;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CateoryServiceImpl implements CategoryService {

  @Autowired private CategoryRepository CateoryRepo;

  public CategoryEntity saveCategory(CategoryEntity category) {
    return CateoryRepo.save(category);
  }

  @Override
  public void deleteCategoryById(Long categoryId) {
    // TODO Auto-generated method stub
    CateoryRepo.deleteById(categoryId);
  }

  @Override
  public CategoryEntity getCategoryById(Long categoryId) {
    // TODO Auto-generated method stub
    Optional<CategoryEntity> category = CateoryRepo.findById(categoryId);

    if (!category.isPresent()) return null;

    return category.get();
  }

  @Override
  public CategoryEntity updateCategoryById(Long categoryId, CategoryEntity category) {
    Optional<CategoryEntity> categorysFromDb = CateoryRepo.findById(categoryId);

    if (!categorysFromDb.isPresent()) return null;

    String categoryname = category.getCategoryname();
    String cateoryDescription = category.getCategoryDescription();

    CategoryEntity categoryFromDb = categorysFromDb.get();

    if (Objects.nonNull(categoryname) && !"".equals(categoryname))
      categoryFromDb.setCategoryname(categoryname);
    if (Objects.nonNull(cateoryDescription) && !"".equals(cateoryDescription))
      categoryFromDb.setCategoryDescription(cateoryDescription);

    return CateoryRepo.save(categoryFromDb);
  }
}
