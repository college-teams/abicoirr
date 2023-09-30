package com.project.abicoirr.models.Product;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.project.abicoirr.entity.Category;
import com.project.abicoirr.entity.ExternalLinks;
import com.project.abicoirr.entity.Product;
import com.project.abicoirr.entity.ProductImage;
import java.util.ArrayList;
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
public class ProductResponse {

  private Category category;
  private Long id;
  private String productName;
  private String productDescription;
  private float price;
  private float discountPercent;
  private int stockQuantity;
  private int minOrder;
  private int maxOrder;
  private float avgRating;
  private List<ProductImage> images = new ArrayList<>();
  private List<ExternalLinks> links = new ArrayList<>();

  public static List<ProductResponse> from(List<Product> products) {
    return products.stream().map(ProductResponse::from).collect(Collectors.toList());
  }

  public static ProductResponse from(Product product) {
    return ProductResponse.builder()
        .category(product.getCategory())
        .id(product.getId() > 0 ? product.getId() : null)
        .productName(product.getProductName())
        .productDescription(product.getProductDescription())
        .price(product.getPrice())
        .discountPercent(product.getDiscountPercent())
        .stockQuantity(product.getStockQuantity())
        .minOrder(product.getMinOrder())
        .maxOrder(product.getMaxOrder())
        .avgRating(product.getAvgRating())
        .images(product.getImages())
        .links(product.getLinks())
        .build();
  }
}
