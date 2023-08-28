package com.project.abicoirr.entity;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product extends CommonEntity {

  private String productname;
  private String productDescription;
  private float price;
  private float discountPercent;
  private int stockQuantity;
  private int minOrder;
  private int maxOrder;
  private float avgRating;
}
