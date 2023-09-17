package com.project.abicoirr.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Category extends CommonEntity {

  @Column(nullable = false)
  private String categoryName;

  @Column(nullable = false)
  private String categoryDescription;

  private String imagePath;
  private String imageKey;
}
