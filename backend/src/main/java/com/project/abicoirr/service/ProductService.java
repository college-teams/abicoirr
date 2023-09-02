package com.project.abicoirr.service;

import java.util.List;

import com.project.abicoirr.entity.Product;

public interface ProductService {

  public Product saveProduct(Product product);

  public void deleteProductById(Long productId);

  public Product getProductById(Long productId);

  public Product updateProductById(Long productId, Product product);

  public List<Product> getAllProducts();

  public List<Product> searchProduct(String keyword);

  public List<Product> getProductsFromSameCategory(Long productId);
}
