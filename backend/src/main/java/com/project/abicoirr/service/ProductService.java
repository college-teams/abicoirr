package com.project.abicoirr.service;

import static com.project.abicoirr.codes.ErrorCodes.EMPTY_FILE_REQUEST;
import static com.project.abicoirr.codes.ErrorCodes.IMAGE_DELETE_FAILED;
import static com.project.abicoirr.codes.ErrorCodes.IMAGE_UPLOAD_FAILED;
import static com.project.abicoirr.codes.ErrorCodes.PRODUCT_NOT_FOUND;
import static com.project.abicoirr.codes.SuccessCodes.IMAGE_DELETE_SUCCESS;
import static com.project.abicoirr.codes.SuccessCodes.IMAGE_UPLOAD_SUCCESS;
import static com.project.abicoirr.codes.SuccessCodes.LATEST_PRODUCT_LIST_FETCHED;
import static com.project.abicoirr.codes.SuccessCodes.POPULAR_PRODUCT_LIST_FETCHED;
import static com.project.abicoirr.codes.SuccessCodes.PRODUCT_CREATED;
import static com.project.abicoirr.codes.SuccessCodes.PRODUCT_DELETE_SUCCESS;
import static com.project.abicoirr.codes.SuccessCodes.PRODUCT_LIST_FETCHED;
import static com.project.abicoirr.codes.SuccessCodes.PRODUCT_UPDATED;

import com.project.abicoirr.entity.Category;
import com.project.abicoirr.entity.ExternalLinks;
import com.project.abicoirr.entity.Product;
import com.project.abicoirr.entity.ProductImage;
import com.project.abicoirr.exception.BaseException;
import com.project.abicoirr.models.Product.CreateProductRequest;
import com.project.abicoirr.models.Product.ProductResponse;
import com.project.abicoirr.models.Product.UpdateProductRequest;
import com.project.abicoirr.models.response.AbstractResponse;
import com.project.abicoirr.models.response.ApiResponse;
import com.project.abicoirr.repository.ProductImageRepository;
import com.project.abicoirr.repository.ProductRepository;
import com.project.abicoirr.util.Util;
import jakarta.transaction.Transactional;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@Slf4j
@RequiredArgsConstructor(onConstructor = @__({@Autowired}))
public class ProductService {

  private final ProductRepository productRepository;
  private final CategoryService categoryService;
  private final AwsService awsService;
  private final ProductImageRepository productImageRepository;

  public ApiResponse<ProductResponse> getProduct(Long productId) throws BaseException {
    Product productData = getProductById(productId);
    updateViewCount(productData);
    ProductResponse product = ProductResponse.from(productData);
    return new ApiResponse<>(PRODUCT_LIST_FETCHED, AbstractResponse.StatusType.SUCCESS, product);
  }

  public ApiResponse<List<ProductResponse>> getProductList() {
    List<Product> products = productRepository.findAll();
    List<ProductResponse> productList = ProductResponse.from(products);
    return new ApiResponse<>(
        PRODUCT_LIST_FETCHED, AbstractResponse.StatusType.SUCCESS, productList);
  }

  public ApiResponse<List<ProductResponse>> getLatestProductList(int limit) {
    PageRequest pageRequest = PageRequest.of(0, limit, Sort.by(Sort.Direction.DESC, "createdAt"));
    List<Product> products = productRepository.findAll(pageRequest).getContent();

    List<ProductResponse> productList = ProductResponse.from(products);
    return new ApiResponse<>(
        LATEST_PRODUCT_LIST_FETCHED, AbstractResponse.StatusType.SUCCESS, productList);
  }

  public ApiResponse<List<ProductResponse>> getMostPopularProductList(int limit) {
    PageRequest pageRequest = PageRequest.of(0, limit, Sort.by(Sort.Direction.DESC, "viewCount"));
    List<Product> products = productRepository.findAll(pageRequest).getContent();

    List<ProductResponse> productList = ProductResponse.from(products);
    return new ApiResponse<>(
        POPULAR_PRODUCT_LIST_FETCHED, AbstractResponse.StatusType.SUCCESS, productList);
  }

  @Transactional
  public ApiResponse<ProductResponse> addProduct(CreateProductRequest createProductRequest)
      throws BaseException {

    Category category = categoryService.getCategoryById(createProductRequest.getCategoryId());

    Product product = CreateProductRequest.from(createProductRequest, category);
    Product savedProduct = productRepository.save(product);

    createProductRequest
        .getImages()
        .forEach(
            e -> {
              e.setProduct(savedProduct);
            });
    savedProduct.setImages(createProductRequest.getImages());

    createProductRequest
        .getLinks()
        .forEach(
            e -> {
              e.setProduct(savedProduct);
            });
    savedProduct.setLinks(createProductRequest.getLinks());

    ProductResponse productResponse = ProductResponse.from(savedProduct);
    return new ApiResponse<>(PRODUCT_CREATED, AbstractResponse.StatusType.SUCCESS, productResponse);
  }

  @Transactional
  public ApiResponse<ProductResponse> updateProductDetails(
      Long productId, UpdateProductRequest updateProductRequest) throws BaseException {
    Product existingProduct = getProductById(productId);

    Category category = categoryService.getCategoryById(updateProductRequest.getCategoryId());

    updateProductsFields(existingProduct, updateProductRequest, category);
    // Update the product_images table
    updateProductImages(updateProductRequest, existingProduct);
    // Update the external_Links table
    updateExternalLinks(updateProductRequest, existingProduct);

    Product updatedProduct = productRepository.save(existingProduct);

    ProductResponse productResponse = ProductResponse.from(updatedProduct);
    return new ApiResponse<>(PRODUCT_UPDATED, AbstractResponse.StatusType.SUCCESS, productResponse);
  }

  public ApiResponse deleteProductById(Long productId) throws BaseException {
    Product product = getProductById(productId);

    for (ProductImage e : product.getImages()) {
      if (!Util.isEmpty(e.getImageKey())) {
        deleteImage(e.getImageKey());
      }
    }

    productRepository.deleteProduct(product.getId());

    return new ApiResponse<>(PRODUCT_DELETE_SUCCESS, AbstractResponse.StatusType.SUCCESS);
  }

  public ApiResponse<?> deleteProductImage(String key) throws BaseException {
    try {
      Optional<ProductImage> productImage = productImageRepository.findByImageKey(key);

      //      if (productImage.isEmpty()) {
      //        throw new BaseException(PRODUCT_IMAGE_NOT_FOUND);
      //      }

      if (!Util.isEmpty(key)) {
        deleteImage(key);
      }
      productImage.ifPresent(productImageRepository::delete);
    } catch (Exception ex) {
      log.error("Error ", ex);
      throw new BaseException(IMAGE_DELETE_FAILED);
    }
    return new ApiResponse<>(IMAGE_DELETE_SUCCESS, AbstractResponse.StatusType.SUCCESS);
  }

  public ApiResponse<?> uploadImage(Long productId, List<MultipartFile> multipartFiles)
      throws BaseException {

    if (multipartFiles.isEmpty()) {
      throw new BaseException(EMPTY_FILE_REQUEST);
    }

    try {
      Product product = getProductById(productId);

      List<ProductImage> productImages = uploadImages(multipartFiles);

      product.getImages().addAll(productImages);
      productRepository.save(product);

      return new ApiResponse<>(IMAGE_UPLOAD_SUCCESS, AbstractResponse.StatusType.SUCCESS);
    } catch (Exception ex) {
      log.error("Error ", ex);
      throw new BaseException(IMAGE_UPLOAD_FAILED);
    }
  }

  private List<ProductImage> uploadImages(List<MultipartFile> multipartFiles) {
    List<ProductImage> productImages = new ArrayList<>();

    List<String> uploadedImageKeys = new ArrayList<>();

    try {
      multipartFiles.forEach(
          multipartFile -> {
            String uniqueKey =
                Util.generateUniqueImageKey("product", multipartFile.getOriginalFilename());
            String productImageLink = null;
            try {
              productImageLink = awsService.uploadFile(uniqueKey, multipartFile);

            } catch (IOException e) {
              throw new RuntimeException(e);
            }

            uploadedImageKeys.add(uniqueKey);
            ProductImage productImage = new ProductImage();
            productImage.setImageKey(uniqueKey);
            productImage.setImagePath(productImageLink);
            productImage.setIsPrimary(
                true); // TODO: decide which file to make the main file and how?
            productImages.add(productImage);
          });
    } catch (Exception e) {
      // Handle any errors during image upload
      log.info("Rollback the uploaded images");
      rollbackUploads(uploadedImageKeys);
      throw e;
    }

    return productImages;
  }

  private void rollbackUploads(List<String> keysToDelete) {
    try {
      awsService.deleteFiles(keysToDelete);
    } catch (Exception e) {
      log.error("Error during image rollback deletion", e);
    }
  }

  public void deleteImage(String key) throws BaseException {
    try {
      awsService.deleteFile(key);
    } catch (Exception ex) {
      log.error("Error ", ex);
      throw new BaseException(IMAGE_DELETE_FAILED);
    }
  }

  public List<Product> searchProduct(String keyword) {
    return productRepository.findByProductNameContainingIgnoreCase(keyword);
  }

  public Product getProductById(Long id) throws BaseException {
    Optional<Product> product = productRepository.findById(id);

    if (product.isEmpty()) {
      throw new BaseException(PRODUCT_NOT_FOUND);
    }
    return product.get();
  }

  private void updateProductsFields(
      Product existingProduct, UpdateProductRequest updateProductRequest, Category newCategory)
      throws BaseException {
    existingProduct.setProductName(updateProductRequest.getProductName());
    existingProduct.setProductDescription(updateProductRequest.getProductDescription());
    existingProduct.setDiscountPercent(updateProductRequest.getDiscountPercent());
    existingProduct.setAvgRating(updateProductRequest.getAvgRating());
    existingProduct.setMaxOrder(updateProductRequest.getMaxOrder());
    existingProduct.setMinOrder(updateProductRequest.getMinOrder());
    existingProduct.setActualPrice(updateProductRequest.getActualPrice());
    existingProduct.setSellingPrice(updateProductRequest.getSellingPrice());
    existingProduct.setStockQuantity(updateProductRequest.getStockQuantity());
    existingProduct.setCategory(newCategory);
  }

  private void updateProductImages(
      UpdateProductRequest updateProductRequest, Product existingProduct) {
    List<ProductImage> updatedImages = updateProductRequest.getImages();
    if (Objects.nonNull(updatedImages) && updatedImages.size() > 0) {
      List<ProductImage> existingImages = existingProduct.getImages();

      for (ProductImage image : existingImages) image.setProduct(null);

      existingProduct.getImages().clear();

      for (ProductImage updatedImage : updatedImages) {
        updatedImage.setProduct(existingProduct);
        existingProduct.getImages().add(updatedImage);
      }
    }
  }

  private void updateExternalLinks(
      UpdateProductRequest updateProductRequest, Product existingProduct) {
    List<ExternalLinks> updatedLinks = updateProductRequest.getLinks();
    if (Objects.nonNull(updatedLinks) && updatedLinks.size() > 0) {
      List<ExternalLinks> existingLinks = existingProduct.getLinks();

      for (ExternalLinks link : existingLinks) link.setProduct(null);

      existingProduct.getLinks().clear();

      for (ExternalLinks updatedLink : updatedLinks) {
        updatedLink.setProduct(existingProduct);
        existingProduct.getLinks().add(updatedLink);
      }
    }
  }

  private void updateViewCount(Product product) {
    product.setViewCount(product.getViewCount() + 1);
    productRepository.save(product);
  }
}
