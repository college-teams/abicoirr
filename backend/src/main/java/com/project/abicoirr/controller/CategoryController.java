package com.project.abicoirr.controller;

import com.project.abicoirr.models.Category.CategoryResponse;
import com.project.abicoirr.models.response.ApiResponse;
import com.project.abicoirr.service.CategoryService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/category")
@RequiredArgsConstructor(onConstructor = @__({@Autowired}))
public class CategoryController {

  private final CategoryService categoryService;

  @GetMapping("/")
  public ResponseEntity<ApiResponse<List<CategoryResponse>>> getCategoryList() {
    return new ResponseEntity<>(categoryService.getCategoryList(), HttpStatus.OK);
  }
}
