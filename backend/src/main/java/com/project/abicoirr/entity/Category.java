package com.project.abicoirr.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;
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

  @Column(nullable = false, columnDefinition = "LONGTEXT")
  @Lob
  private String categoryDescription;

  @Column(nullable = true)
  private String imagePath;

  @Column(nullable = true, unique = true)
  private String imageKey;

  @JsonIgnore
  @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Product> products = new ArrayList<>();
}
