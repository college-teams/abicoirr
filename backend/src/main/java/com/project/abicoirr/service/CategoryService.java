package com.project.abicoirr.service;

import static com.project.abicoirr.codes.ErrorCodes.CATEGORY_NOT_FOUND;
import static com.project.abicoirr.codes.SuccessCodes.CATEGORY_CREATED;
import static com.project.abicoirr.codes.SuccessCodes.CATEGORY_LIST_FETCHED;

import com.project.abicoirr.entity.Category;
import com.project.abicoirr.exception.BaseException;
import com.project.abicoirr.models.Category.CategoryResponse;
import com.project.abicoirr.models.Category.CreateCategoryRequest;
import com.project.abicoirr.models.response.AbstractResponse.StatusType;
import com.project.abicoirr.models.response.ApiResponse;
import com.project.abicoirr.repository.CategoryRepository;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor(onConstructor = @__({@Autowired}))
public class CategoryService {

  private final CategoryRepository categoryRepository;

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

  private Category getCategoryById(Long id) throws BaseException {
    Optional<Category> category = categoryRepository.findById(id);

    if (category.isEmpty()) {
      throw new BaseException(CATEGORY_NOT_FOUND);
    }

    return category.get();
  }
}
