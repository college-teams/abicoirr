package com.project.abicoirr.models.Category;

import com.project.abicoirr.entity.Category;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryResponse {

  private String categoryname;
  private String categoryDescription;

  public static List<CategoryResponse> from(List<Category> categories) {
    return categories.stream().map(CategoryResponse::from).collect(Collectors.toList());
  }

  public static CategoryResponse from(Category category) {
    return CategoryResponse.builder()
        .categoryname(category.getCategoryname())
        .categoryDescription(category.getCategoryDescription())
        .build();
  }
}
