package com.project.abicoirr.service;

import static com.project.abicoirr.codes.ErrorCodes.CATEGORY_NOT_FOUND;
import static com.project.abicoirr.codes.ErrorCodes.IMAGE_DELETE_FAILED;
import static com.project.abicoirr.codes.ErrorCodes.IMAGE_UPLOAD_FAILED;
import static com.project.abicoirr.codes.SuccessCodes.CATEGORY_CREATED;
import static com.project.abicoirr.codes.SuccessCodes.CATEGORY_DELETE_SUCCESS;
import static com.project.abicoirr.codes.SuccessCodes.CATEGORY_LIST_FETCHED;
import static com.project.abicoirr.codes.SuccessCodes.CATEGORY_UPDATED;
import static com.project.abicoirr.codes.SuccessCodes.IMAGE_DELETE_SUCCESS;
import static com.project.abicoirr.codes.SuccessCodes.IMAGE_UPLOAD_SUCCESS;

import com.project.abicoirr.entity.Category;
import com.project.abicoirr.exception.BaseException;
import com.project.abicoirr.models.Category.CategoryResponse;
import com.project.abicoirr.models.Category.CreateCategoryRequest;
import com.project.abicoirr.models.response.AbstractResponse;
import com.project.abicoirr.models.response.AbstractResponse.StatusType;
import com.project.abicoirr.models.response.ApiResponse;
import com.project.abicoirr.repository.CategoryRepository;
import com.project.abicoirr.util.Util;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
      Long cateoryId, UpdateCategoryRequest updateCategoryRequest) throws BaseException {

    Category existingCategory = getCategoryById(cateoryId);
    updateCategoryFields(existingCategory, UpdateCategoryRequest);
    Category updatedCategory = cateogoryRepository.save(existingAdminOrder);

    CategoryResponse categoryResponse = CategoryResponse.from(updatedCategory);
    return new ApiResponse<>(CATEGORY_UPDATED, StatusType.SUCCESS, categoryResponse);
  }

  public ApiResponse deleteCategory(Long cateoryId) throws BaseException {
    Category categoryData = getCategoryById(cateoryId);

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

  public ApiResponse<?> uploadImage(Long categoryId, MultipartFile multipartFile)
      throws BaseException {

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

  public ApiResponse<?> deleteImage(String key) throws BaseException {
    try {
      awsService.deleteFile(key);
    } catch (Exception ex) {
      log.error("Error ", ex);
      throw new BaseException(IMAGE_DELETE_FAILED);
    }
    return new ApiResponse<>(IMAGE_DELETE_SUCCESS, AbstractResponse.StatusType.SUCCESS);
  }
}
