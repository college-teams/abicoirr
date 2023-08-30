package com.project.abicoirr.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.abicoirr.entity.CategoryEntity;
import com.project.abicoirr.service.CategoryService;

import jakarta.validation.Valid;

@RestController
public class CategoryController {

  @Autowired private CategoryService categoryService;

  @PostMapping("/save-category")
  public CategoryEntity saveCategory(@Valid @RequestBody CategoryEntity category) {
    return categoryService.saveCategory(category);
  }

  @DeleteMapping("/delete-cateory/{id}")
  public String deleteCategoryById(@PathVariable("id") Long categoryId) {
    categoryService.deleteCategoryById(categoryId);
    return "Category is successfully deleted";
  }

  @GetMapping("/getcategory/{id}")
  public CategoryEntity getCategoryById(@PathVariable("id") Long categoryId) {
    return categoryService.getCategoryById(categoryId);
  }

  @PutMapping("/updatecategory/{id}")
  public CategoryEntity updateCategoryById(
      @PathVariable("id") Long categoryId, @RequestBody CategoryEntity category) {
    return categoryService.updateCategoryById(categoryId, category);
  }
  
  @GetMapping("/search-category")
  public List<CategoryEntity> searchCategory(@RequestParam String keyword){
	  return categoryService.searchCategory(keyword);
  }
}
