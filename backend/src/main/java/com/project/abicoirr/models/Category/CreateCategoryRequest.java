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
  @NotNull private String categoryname;
  @NotNull private String categoryDescription;

  public static Category from(CreateCategoryRequest createCategoryRequest) {
    Category category = new Category();
    category.setCategoryname(createCategoryRequest.getCategoryname());
    category.setCategoryDescription(createCategoryRequest.getCategoryDescription());

    return category;
  }
}
