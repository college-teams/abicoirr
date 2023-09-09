package com.project.abicoirr.entity;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryEntity extends CommonEntity {

  private String categoryname;
  private String categoryDescription;

  private String imagePath;
  private String imageKey;
}
