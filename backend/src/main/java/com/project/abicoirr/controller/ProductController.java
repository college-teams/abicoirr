package com.project.abicoirr.controller;

import com.project.abicoirr.entity.Product;
import com.project.abicoirr.exception.BaseException;
import com.project.abicoirr.models.Product.CreateProductRequest;
import com.project.abicoirr.models.Product.ProductResponse;
import com.project.abicoirr.models.Product.UpdateProductRequest;
import com.project.abicoirr.models.response.ApiResponse;
import com.project.abicoirr.service.ProductService;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor(onConstructor = @__({@Autowired}))
public class ProductController {

  private final ProductService productService;

  @GetMapping("/{id}")
  public ResponseEntity<ApiResponse<ProductResponse>> getProduct(@PathVariable Long id)
      throws BaseException {
    return new ResponseEntity<>(productService.getProduct(id), HttpStatus.OK);
  }

  @GetMapping("/")
  public ResponseEntity<ApiResponse<List<ProductResponse>>> getProductList() {
    return new ResponseEntity<>(productService.getProductList(), HttpStatus.OK);
  }

  @PostMapping("/")
  public ResponseEntity<ApiResponse<ProductResponse>> addProduct(
      @Valid @RequestBody CreateProductRequest createProductRequest) throws BaseException {
    return new ResponseEntity<>(
        productService.addProduct(createProductRequest), HttpStatus.CREATED);
  }

  @PutMapping("/{id}")
  public ResponseEntity<ApiResponse<ProductResponse>> updateProductById(
      @PathVariable("id") Long productId, @Valid @RequestBody UpdateProductRequest product)
      throws BaseException {
    return new ResponseEntity<>(
        productService.updateProductDetails(productId, product), HttpStatus.OK);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<ApiResponse> deleteProductById(@PathVariable("id") Long productId)
      throws BaseException {
    return new ResponseEntity<>(productService.deleteProductById(productId), HttpStatus.OK);
  }

  @DeleteMapping("/{id}/image")
  public ResponseEntity<ApiResponse<?>> deleteImage(@Valid @RequestParam("imageKey") String key)
      throws BaseException {
    return new ResponseEntity<>(productService.deleteProductImage(key), HttpStatus.OK);
  }

  @Deprecated
  @PostMapping("/product/{id}/upload")
  public ResponseEntity<ApiResponse<?>> uploadImages(
      @PathVariable(name = "id") Long productId,
      @Valid @RequestParam("files") List<MultipartFile> multipartFiles)
      throws BaseException {
    return new ResponseEntity<>(
        productService.uploadImage(productId, multipartFiles), HttpStatus.OK);
  }

  @GetMapping("/getProduct-byCategory/{id}")
  public List<Product> getProductsFromSameCategory(@PathVariable("id") Long productId)
      throws BaseException {
    return productService.getProductsFromSameCategory(productId);
  }

  @GetMapping("/search-product")
  public List<Product> searchProduct(@RequestParam String keyword) {
    return productService.searchProduct(keyword);
  }
}
