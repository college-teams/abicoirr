package com.project.abicoirr.models.Category;

import com.project.abicoirr.entity.Category;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateCategoryRequest {
  @NotNull private String categoryName;
  @NotNull private String categoryDescription;

  public static Category from(CreateCategoryRequest createCategoryRequest) {
    Category category = new Category();
    category.setCategoryName(createCategoryRequest.getCategoryName());
    category.setCategoryDescription(createCategoryRequest.getCategoryDescription());

    return category;
  }
}
