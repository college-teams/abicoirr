package com.project.abicoirr.service;

import com.project.abicoirr.entity.Product;
import com.project.abicoirr.exception.BaseException;
import com.project.abicoirr.models.response.ApiResponse;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public interface ProductService {

  public Product saveProduct(Product product);

  public void deleteProductById(Long productId);

  public Product getProductById(Long productId);

  public Product updateProductById(Long productId, Product product);

  public List<Product> getAllProducts();

  public List<Product> searchProduct(String keyword);

  public List<Product> getProductsFromSameCategory(Long productId);

  public ApiResponse uploadImage(MultipartFile multipartFile) throws BaseException;
}
