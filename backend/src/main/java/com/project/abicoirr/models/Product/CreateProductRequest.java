package com.project.abicoirr.models.Product;

import com.project.abicoirr.entity.Category;
import com.project.abicoirr.entity.ExternalLinks;
import com.project.abicoirr.entity.Product;
import com.project.abicoirr.entity.ProductImage;
import jakarta.validation.constraints.NotEmpty;
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
  @NotNull private float actualPrice;
  @NotNull private float sellingPrice;
  private float discountPercent;
  @NotNull private int stockQuantity;
  private int minOrder;
  private int maxOrder;
  private float avgRating;
  private List<ProductImage> images = new ArrayList<>();
  @NotEmpty private List<ExternalLinks> links = new ArrayList<>();

  public static Product from(CreateProductRequest createProductRequest, Category category) {
    Product product = new Product();
    product.setCategory(category);
    product.setProductName(createProductRequest.getProductName());
    product.setProductDescription(createProductRequest.getProductDescription());
    product.setActualPrice(createProductRequest.getActualPrice());
    product.setSellingPrice(createProductRequest.getSellingPrice());
    product.setDiscountPercent(createProductRequest.getDiscountPercent());
    product.setStockQuantity(createProductRequest.getStockQuantity());
    product.setMaxOrder(createProductRequest.getMaxOrder());
    product.setMinOrder(createProductRequest.getMinOrder());
    product.setAvgRating(createProductRequest.getAvgRating());

    return product;
  }
}
