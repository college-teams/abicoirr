package com.project.abicoirr.entity;

import jakarta.persistence.Entity;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class CategoryEntity extends CommonEntity {

  private String categoryname;
  private String categoryDescription;
}
