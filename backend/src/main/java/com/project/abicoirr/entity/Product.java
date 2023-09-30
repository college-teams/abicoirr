package com.project.abicoirr.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
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
  private Category category;

  @Column(nullable = false)
  private String productName;

  @Column(nullable = false, columnDefinition = "LONGTEXT")
  @Lob
  private String productDescription;

  @Column(nullable = false)
  private float price;

  @Column(nullable = true)
  private float discountPercent;

  @Column(nullable = false)
  private int stockQuantity;

  @Column(nullable = true)
  private int minOrder;

  @Column(nullable = true)
  private int maxOrder;

  @Column(nullable = true)
  private float avgRating;

  @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<ProductImage> images = new ArrayList<>();

  @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<ExternalLinks> links = new ArrayList<>();

  @JsonIgnore
  @ManyToMany(mappedBy = "products", cascade = CascadeType.REMOVE)
  private Set<AdminOrder> adminOrders = new HashSet<>();
}
