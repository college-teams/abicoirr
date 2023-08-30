package com.project.abicoirr.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.abicoirr.entity.Product;
import com.project.abicoirr.service.ProductService;

import jakarta.validation.Valid;

@RestController
public class ProductController {

  @Autowired private ProductService productService;

  @PostMapping("/save-product")
  public Product saveProduct(@Valid @RequestBody Product product) {
    return productService.saveProduct(product);
  }

  @DeleteMapping("/delete-product/{id}")
  public String deleteProductById(@PathVariable("id") Long productId) {
    productService.deleteProductById(productId);
    return "Product is successfully deleted";
  }

  @GetMapping("/getProduct/{id}")
  public Product getProductById(@PathVariable("id") Long productId) {
    return productService.getProductById(productId);
  }

  @PutMapping("/updateProduct/{id}")
  public Product updateProductById(
      @PathVariable("id") Long productId, @RequestBody Product product) {
    return productService.updateProductById(productId, product);
  }
  
  @GetMapping("/getProducts")
  public List<Product> getAllProducts(){
	  return productService.getAllProducts();
  }
  
  @GetMapping("/search-product")
  public List<Product> searchProduct(@RequestParam String keyword){
	  return productService.searchProduct(keyword);
  }
}
