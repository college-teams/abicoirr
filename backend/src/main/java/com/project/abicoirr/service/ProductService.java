package com.project.abicoirr.service;

import static com.project.abicoirr.codes.ErrorCodes.*;
import static com.project.abicoirr.codes.SuccessCodes.*;

import com.project.abicoirr.entity.Category;
import com.project.abicoirr.entity.ExternalLinks;
import com.project.abicoirr.entity.Product;
import com.project.abicoirr.entity.ProductImage;
import com.project.abicoirr.exception.BaseException;
import com.project.abicoirr.models.Product.CreateProductRequest;
import com.project.abicoirr.models.Product.ProductResponse;
import com.project.abicoirr.models.response.AbstractResponse;
import com.project.abicoirr.models.response.ApiResponse;
import com.project.abicoirr.repository.ProductRepository;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor(onConstructor = @__({@Autowired}))
public class ProductService {

  private final ProductRepository productRepository;
  private final CategoryService categoryService;

  public ApiResponse<ProductResponse> getProduct(Long productId) throws BaseException {
    Product productData = getProductById(productId);

    ProductResponse product = ProductResponse.from(productData);
    return new ApiResponse<>(PRODUCT_LIST_FETCHED, AbstractResponse.StatusType.SUCCESS, product);
  }

  public ApiResponse<List<ProductResponse>> getProductList() {
    List<Product> products = productRepository.findAll();
    List<ProductResponse> productList = ProductResponse.from(products);
    return new ApiResponse<>(
        PRODUCT_LIST_FETCHED, AbstractResponse.StatusType.SUCCESS, productList);
  }

  public ApiResponse<ProductResponse> addProduct(CreateProductRequest createProductRequest)
      throws BaseException {


    Category category = categoryService.getCategoryById(createProductRequest.getCategoryId());
    List<ProductImage> images = createProductRequest.getImages();
    List<ExternalLinks> links = createProductRequest.getLinks();
    Product product = CreateProductRequest.from(createProductRequest, category,images,links);
    productRepository.save(product);

    ProductResponse productResponse = ProductResponse.from(product);
    return new ApiResponse<>(PRODUCT_CREATED, AbstractResponse.StatusType.SUCCESS, productResponse);
  }
  public Product getProductById(Long id) throws BaseException {
    Optional<Product> product = productRepository.findById(id);

    if (product.isEmpty()) {
      throw new BaseException(PRODUCT_NOT_FOUND);
    }
    return product.get();
  }
}
