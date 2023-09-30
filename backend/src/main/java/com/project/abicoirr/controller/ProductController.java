package com.project.abicoirr.controller;

import com.project.abicoirr.entity.Product;
import com.project.abicoirr.exception.BaseException;
import com.project.abicoirr.models.Product.CreateProductRequest;
import com.project.abicoirr.models.Product.ProductResponse;
import com.project.abicoirr.models.response.ApiResponse;
import com.project.abicoirr.service.ProductService;
import com.project.abicoirr.service.ProductServiceImpl;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor(onConstructor = @__({@Autowired}))
public class ProductController {

  private final ProductService productService;
  private final ProductServiceImpl productServiceImpl;

  @PostMapping("/save-product")
  public Product saveProduct(@Valid @RequestBody Product product) throws BaseException {
    return productServiceImpl.saveProduct(product);
  }

  @PostMapping("/")
  public ResponseEntity<ApiResponse<ProductResponse>> addProduct(
          @Valid @RequestBody CreateProductRequest createProductRequest) throws BaseException {
    return new ResponseEntity<>(productService.addProduct(createProductRequest), HttpStatus.OK);
  }
  @DeleteMapping("/delete-product/{id}")
  public String deleteProductById(@PathVariable("id") Long productId) {
    productServiceImpl.deleteProductById(productId);
    return "Product is successfully deleted";
  }

  @GetMapping("/{id}")
  public ResponseEntity<ApiResponse<ProductResponse>> getProduct(@PathVariable Long id)
      throws BaseException {
    return new ResponseEntity<>(productService.getProduct(id), HttpStatus.OK);
  }

  @PutMapping("/updateProduct/{id}")
  public Product updateProductById(
      @PathVariable("id") Long productId, @RequestBody Product product) {
    return productServiceImpl.updateProductById(productId, product);
  }

  @GetMapping("/")
  public ResponseEntity<ApiResponse<List<ProductResponse>>> getProductList() {
    return new ResponseEntity<>(productService.getProductList(), HttpStatus.OK);
  }

  @GetMapping("/getProduct-byCategory/{id}")
  public List<Product> getProductsFromSameCategory(@PathVariable("id") Long productId) {
    return productServiceImpl.getProductsFromSameCategory(productId);
  }

  @PostMapping("/product/{id}/upload")
  public ResponseEntity<ApiResponse<?>> uploadImages(
      @PathVariable(name = "id") Long productId,
      @Valid @RequestParam("files") List<MultipartFile> multipartFiles)
      throws BaseException {
    return new ResponseEntity<>(
        productServiceImpl.uploadImage(productId, multipartFiles), HttpStatus.OK);
  }
}
