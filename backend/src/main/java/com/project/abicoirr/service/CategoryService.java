package com.project.abicoirr.service;

import com.project.abicoirr.entity.CategoryEntity;
import com.project.abicoirr.exception.BaseException;
import com.project.abicoirr.models.response.ApiResponse;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public interface CategoryService {

  public CategoryEntity saveCategory(CategoryEntity category);

  public CategoryEntity getCategoryById(Long categoryId);

  public CategoryEntity updateCategoryById(Long categoryId, CategoryEntity category);

  public void deleteCategoryById(Long categoryId);

  public List<CategoryEntity> searchCategory(String keyword);

  public ApiResponse<?> uploadImage(Long productId, MultipartFile multipartFile)
      throws BaseException;

  public ApiResponse<?> deleteImage(String key) throws BaseException;
}
