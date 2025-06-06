package com.project.abicoirr.service;

import static com.project.abicoirr.codes.ErrorCodes.CATEGORY_NOT_FOUND;
import static com.project.abicoirr.codes.ErrorCodes.EMPTY_FILE_REQUEST;
import static com.project.abicoirr.codes.ErrorCodes.IMAGE_DELETE_FAILED;
import static com.project.abicoirr.codes.ErrorCodes.IMAGE_UPLOAD_FAILED;
import static com.project.abicoirr.codes.SuccessCodes.*;

import com.project.abicoirr.entity.Category;
import com.project.abicoirr.entity.Product;
import com.project.abicoirr.exception.BaseException;
import com.project.abicoirr.models.Category.CategoryResponse;
import com.project.abicoirr.models.Category.CreateCategoryRequest;
import com.project.abicoirr.models.Category.UpdateCategoryRequest;
import com.project.abicoirr.models.Product.ProductResponse;
import com.project.abicoirr.models.response.AbstractResponse;
import com.project.abicoirr.models.response.AbstractResponse.StatusType;
import com.project.abicoirr.models.response.ApiResponse;
import com.project.abicoirr.repository.CategoryRepository;
import com.project.abicoirr.util.Util;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@Slf4j
@RequiredArgsConstructor(onConstructor = @__({@Autowired}))
public class CategoryService {

  private final CategoryRepository categoryRepository;
  private final AwsService awsService;

  public ApiResponse<List<CategoryResponse>> getCategoryList() {
    List<Category> categories = categoryRepository.findAll();
    List<CategoryResponse> categoryList = CategoryResponse.from(categories);
    return new ApiResponse<>(CATEGORY_LIST_FETCHED, StatusType.SUCCESS, categoryList);
  }

  public ApiResponse<CategoryResponse> getCategory(Long categoryId) throws BaseException {
    Category categoryData = getCategoryById(categoryId);

    CategoryResponse category = CategoryResponse.from(categoryData);
    return new ApiResponse<>(CATEGORY_LIST_FETCHED, StatusType.SUCCESS, category);
  }

  public ApiResponse<CategoryResponse> addCategory(CreateCategoryRequest createCategoryRequest) {

    Category category = CreateCategoryRequest.from(createCategoryRequest);
    categoryRepository.save(category);

    CategoryResponse categoryResponse = CategoryResponse.from(category);
    return new ApiResponse<>(CATEGORY_CREATED, StatusType.SUCCESS, categoryResponse);
  }

  public ApiResponse<CategoryResponse> updateCategory(
      Long categoryId, UpdateCategoryRequest updateCategoryRequest) throws BaseException {

    Category existingCategory = getCategoryById(categoryId);
    updateCategoryFields(existingCategory, updateCategoryRequest);
    Category updatedCategory = categoryRepository.save(existingCategory);

    CategoryResponse categoryResponse = CategoryResponse.from(updatedCategory);
    return new ApiResponse<>(CATEGORY_UPDATED, StatusType.SUCCESS, categoryResponse);
  }

  public ApiResponse deleteCategory(Long categoryId) throws BaseException {
    Category categoryData = getCategoryById(categoryId);
    if (StringUtils.isNotBlank(categoryData.getImageKey())) {
      deleteImage(categoryData.getImageKey());
    }

    categoryRepository.delete(categoryData);
    return new ApiResponse<>(CATEGORY_DELETE_SUCCESS, StatusType.SUCCESS);
  }

  public Category getCategoryById(Long id) throws BaseException {
    Optional<Category> category = categoryRepository.findById(id);

    if (category.isEmpty()) {
      throw new BaseException(CATEGORY_NOT_FOUND);
    }

    return category.get();
  }

  public ApiResponse<List<ProductResponse>> getProductsByCategory(
      Long categoryId, int limit, List<Long> excludedProductIds) throws BaseException {
    Category category = getCategoryById(categoryId);

    List<Product> products = category.getProducts();

    // Apply exclusion logic
    if (!excludedProductIds.isEmpty()) {
      products =
          products.parallelStream()
              .filter(product -> !excludedProductIds.contains(product.getId()))
              .collect(Collectors.toList());
    }

    if (limit > 0) {
      limit = products.size() > limit ? limit : products.size();
      products = products.subList(0, limit);
    }

    List<ProductResponse> productResponses = ProductResponse.from(products);
    return new ApiResponse<>(
        PRODUCT_LIST_FETCHED, AbstractResponse.StatusType.SUCCESS, productResponses);
  }

  public ApiResponse<?> uploadImage(Long categoryId, MultipartFile multipartFile)
      throws BaseException {

    if (multipartFile.isEmpty()) {
      throw new BaseException(EMPTY_FILE_REQUEST);
    }

    String uniqueKey = Util.generateUniqueImageKey("category", multipartFile.getOriginalFilename());

    try {
      Category category = getCategoryById(categoryId);

      String categoryImageLink = awsService.uploadFile(uniqueKey, multipartFile);

      category.setImageKey(uniqueKey);
      category.setImagePath(categoryImageLink);
      categoryRepository.save(category);

      return new ApiResponse<>(IMAGE_UPLOAD_SUCCESS, AbstractResponse.StatusType.SUCCESS);
    } catch (BaseException ex) {
      log.error("Error occurred while uploading image to aws {}", ex.getMessage());
      throw ex;
    } catch (Exception ex) {
      log.info("Rollback the uploaded images");
      deleteImage(uniqueKey);
      log.error("Unknown exception occurred while uploading image to aws {}", ex.getMessage());
      throw new BaseException(IMAGE_UPLOAD_FAILED);
    }
  }

  public ApiResponse<?> deleteImage(Long categoryId, String key) throws BaseException {
    try {
      Category category = getCategoryById(categoryId);

      if (StringUtils.isNotBlank(key)) {
        deleteImage(key);
      }

      category.setImageKey(null);
      category.setImagePath(null);
      categoryRepository.save(category);
    } catch (Exception ex) {
      log.error("Error ", ex);
      throw new BaseException(IMAGE_DELETE_FAILED);
    }
    return new ApiResponse<>(IMAGE_DELETE_SUCCESS, AbstractResponse.StatusType.SUCCESS);
  }

  public void deleteImage(String key) throws BaseException {
    try {
      awsService.deleteFile(key);
    } catch (Exception ex) {
      log.error("Error ", ex);
      throw new BaseException(IMAGE_DELETE_FAILED);
    }
  }

  private void updateCategoryFields(
      Category existingCategory, UpdateCategoryRequest updateCategoryRequest) {
    existingCategory.setCategoryName(updateCategoryRequest.getCategoryName());
    existingCategory.setCategoryDescription(updateCategoryRequest.getCategoryDescription());
    existingCategory.setImageKey(updateCategoryRequest.getImageKey());
    existingCategory.setImagePath(updateCategoryRequest.getImagePath());
  }
}
