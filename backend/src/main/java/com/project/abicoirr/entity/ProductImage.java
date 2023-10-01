package com.project.abicoirr.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductImage extends CommonEntity {

  @Column(nullable = false)
  private String imagePath;

  private Boolean isPrimary;

  @Column(nullable = false, unique = true)
  private String imageKey;

  @ManyToOne
  @JsonIgnore
  @JoinColumn(name = "productId", nullable = false)
  private Product product;
}
