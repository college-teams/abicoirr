package com.project.abicoirr.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExternalLinks extends CommonEntity {
  private String link;
  private ECommercePlatformName platformName;

  @JsonIgnore
  @ManyToOne
  @JoinColumn(name = "productId")
  private Product product;
}
