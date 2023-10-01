package com.project.abicoirr.models.Category;

import com.fasterxml.jackson.annotation.JsonInclude;
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
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CategoryResponse {
  private Long id;
  private String categoryName;
  private String categoryDescription;
  private String imagePath;
  private String imageKey;
  private long count;

  public static List<CategoryResponse> from(List<Category> categories) {
    return categories.stream().map(CategoryResponse::from).collect(Collectors.toList());
  }

  public static CategoryResponse from(Category category) {
    return CategoryResponse.builder()
        .id(category.getId() > 0 ? category.getId() : null)
        .categoryName(category.getCategoryName())
        .categoryDescription(category.getCategoryDescription())
        .imagePath(category.getImagePath())
        .imageKey(category.getImageKey())
        .count(category.getProducts().size())
        .build();
  }
}
