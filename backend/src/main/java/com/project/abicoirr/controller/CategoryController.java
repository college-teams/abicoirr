package com.project.abicoirr.controller;

import com.project.abicoirr.exception.BaseException;
import com.project.abicoirr.models.Category.CategoryResponse;
import com.project.abicoirr.models.response.ApiResponse;
import com.project.abicoirr.service.CategoryService;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
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

  @PostMapping("/{id}/upload")
  public ResponseEntity<ApiResponse<?>> uploadImages(
      @PathVariable(name = "id") Long productId,
      @Valid @RequestParam("file") MultipartFile multipartFile)
      throws BaseException {
    return new ResponseEntity<>(
        categoryService.uploadImage(productId, multipartFile), HttpStatus.OK);
  }
}
