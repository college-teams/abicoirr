package com.project.abicoirr.service;

import com.project.abicoirr.entity.CategoryEntity;
import com.project.abicoirr.repository.CategoryRepository;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CateoryServiceImpl implements CategoryService {

  @Autowired private CategoryRepository cateoryRepo;

  @Override
  public CategoryEntity saveCategory(CategoryEntity category) {
    return cateoryRepo.save(category);
  }

  @Override
  public void deleteCategoryById(Long categoryId) {
    // TODO Auto-generated method stub
    cateoryRepo.deleteById(categoryId);
  }

  @Override
  public CategoryEntity getCategoryById(Long categoryId) {
    // TODO Auto-generated method stub
    Optional<CategoryEntity> category = cateoryRepo.findById(categoryId);

    if (!category.isPresent()) return null;

    return category.get();
  }

  @Override
  public CategoryEntity updateCategoryById(Long categoryId, CategoryEntity category) {
    Optional<CategoryEntity> categorysFromDb = cateoryRepo.findById(categoryId);

    if (!categorysFromDb.isPresent()) return null;

    String categoryname = category.getCategoryname();
    String cateoryDescription = category.getCategoryDescription();

    CategoryEntity categoryFromDb = categorysFromDb.get();

    if (Objects.nonNull(categoryname) && !"".equals(categoryname))
      categoryFromDb.setCategoryname(categoryname);
    if (Objects.nonNull(cateoryDescription) && !"".equals(cateoryDescription))
      categoryFromDb.setCategoryDescription(cateoryDescription);

    return cateoryRepo.save(categoryFromDb);
  }

  @Override
  public List<CategoryEntity> searchCategory(String keyword) {
    return cateoryRepo.findByCategorynameContainingIgnoreCase(keyword);
  }
}
