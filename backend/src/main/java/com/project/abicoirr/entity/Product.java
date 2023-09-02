package com.project.abicoirr.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product extends CommonEntity {

  @ManyToOne
  @JoinColumn(name = "categoryId")
  private CategoryEntity category;

  private String productName;
  private String productDescription;
  private float price;
  private float discountPercent;
  private int stockQuantity;
  private int minOrder;
  private int maxOrder;
  private float avgRating;

  @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<ProductImage> images = new ArrayList<>();

  @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<ExternalLinks> links = new ArrayList<>();

  @ManyToMany(mappedBy = "products", cascade = CascadeType.REMOVE)
  private Set<AdminOrder> adminOrders = new HashSet<>();
}
