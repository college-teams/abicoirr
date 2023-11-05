package com.project.abicoirr.controller;

import com.project.abicoirr.exception.BaseException;
import com.project.abicoirr.models.Category.CategoryResponse;
import com.project.abicoirr.models.Category.CreateCategoryRequest;
import com.project.abicoirr.models.Category.UpdateCategoryRequest;
import com.project.abicoirr.models.Product.ProductResponse;
import com.project.abicoirr.models.response.ApiResponse;
import com.project.abicoirr.service.CategoryService;
import jakarta.validation.Valid;
import java.util.Collections;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/category")
@RequiredArgsConstructor(onConstructor = @__({@Autowired}))
public class CategoryController {

  private final CategoryService categoryService;

  @GetMapping("/")
  public ResponseEntity<ApiResponse<List<CategoryResponse>>> getCategoryList() {
    return new ResponseEntity<>(categoryService.getCategoryList(), HttpStatus.OK);
  }

  @GetMapping("/{id}")
  public ResponseEntity<ApiResponse<CategoryResponse>> getCategory(@PathVariable Long id)
      throws BaseException {
    return new ResponseEntity<>(categoryService.getCategory(id), HttpStatus.OK);
  }

  @PostMapping("/")
  @PreAuthorize("@accessControlService.isAdmin()")
  public ResponseEntity<ApiResponse<CategoryResponse>> addCategory(
      @Valid @RequestBody CreateCategoryRequest createCategoryRequest) {
    return new ResponseEntity<>(
        categoryService.addCategory(createCategoryRequest), HttpStatus.CREATED);
  }

  @PutMapping("/{id}")
  @PreAuthorize("@accessControlService.isAdmin()")
  public ResponseEntity<ApiResponse<CategoryResponse>> updateCategory(
      @PathVariable Long id, @Valid @RequestBody UpdateCategoryRequest updateCategoryRequest)
      throws BaseException {
    return new ResponseEntity<>(
        categoryService.updateCategory(id, updateCategoryRequest), HttpStatus.OK);
  }

  @DeleteMapping("/{id}")
  @PreAuthorize("@accessControlService.isAdmin()")
  public ResponseEntity<ApiResponse> deleteCategory(@PathVariable Long id) throws BaseException {
    return new ResponseEntity<>(categoryService.deleteCategory(id), HttpStatus.OK);
  }

  @GetMapping("/{id}/products")
  public ResponseEntity<ApiResponse<List<ProductResponse>>> getProductsByCategory(
      @PathVariable("id") Long categoryId,
      @RequestParam(defaultValue = "0", required = false) int limit,
      @RequestParam(required = false) List<Long> excludedProductIds)
      throws BaseException {

    // Check if excludedProductIds is null, if so, initialize an empty list
    if (excludedProductIds == null) {
      excludedProductIds = Collections.emptyList();
    }
    return new ResponseEntity<>(
        categoryService.getProductsByCategory(categoryId, limit, excludedProductIds),
        HttpStatus.OK);
  }

  @Deprecated
  @PostMapping("/{id}/image")
  @PreAuthorize("@accessControlService.isAdmin()")
  public ResponseEntity<ApiResponse<?>> uploadImage(
      @PathVariable(name = "id") Long categoryId,
      @Valid @RequestParam("file") MultipartFile multipartFile)
      throws BaseException {
    return new ResponseEntity<>(
        categoryService.uploadImage(categoryId, multipartFile), HttpStatus.OK);
  }

  @DeleteMapping("/{id}/image")
  @PreAuthorize("@accessControlService.isAdmin()")
  public ResponseEntity<ApiResponse<?>> deleteImage(
      @PathVariable(name = "id") Long categoryId, @Valid @RequestParam("imageKey") String key)
      throws BaseException {
    return new ResponseEntity<>(categoryService.deleteImage(categoryId, key), HttpStatus.OK);
  }
}
