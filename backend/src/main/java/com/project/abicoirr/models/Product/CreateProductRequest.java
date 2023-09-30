package com.project.abicoirr.models.Product;

import com.project.abicoirr.entity.*;
import com.project.abicoirr.entity.Product;
import jakarta.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateProductRequest {

  @NotNull private long categoryId;
  @NotNull private String productName;
  @NotNull private String productDescription;
  @NotNull private float price;
  private float discountPercent;
  @NotNull private int stockQuantity;
  @NotNull private int minOrder;
  @NotNull private int maxOrder;
  @NotNull private float avgRating;
  @NotNull private List<ProductImage> images = new ArrayList<>();
  @NotNull private List<ExternalLinks> links = new ArrayList<>();

  public static Product from(CreateProductRequest createProductRequest, Category category,List<ProductImage> images,List<ExternalLinks> links) {
    Product product = new Product();
    product.setCategory(category);
    product.setProductName(createProductRequest.getProductName());
    product.setProductDescription(createProductRequest.getProductDescription());
    product.setPrice(createProductRequest.getPrice());
    product.setDiscountPercent(createProductRequest.getDiscountPercent());
    product.setStockQuantity(createProductRequest.getStockQuantity());
    product.setMaxOrder(createProductRequest.getMaxOrder());
    product.setMinOrder(createProductRequest.getMinOrder());
    product.setAvgRating(createProductRequest.getAvgRating());
    product.setImages(createProductRequest.getImages());
    product.setLinks(createProductRequest.getLinks());

    return product;
  }
}
