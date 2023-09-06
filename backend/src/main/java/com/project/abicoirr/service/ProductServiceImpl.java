package com.project.abicoirr.service;

import static com.project.abicoirr.codes.ErrorCodes.IMAGE_DELETE_FAILED;
import static com.project.abicoirr.codes.ErrorCodes.IMAGE_UPLOAD_FAILED;
import static com.project.abicoirr.codes.SuccessCodes.IMAGE_DELETE_SUCCESS;
import static com.project.abicoirr.codes.SuccessCodes.IMAGE_UPLOAD_SUCCESS;

import com.project.abicoirr.entity.CategoryEntity;
import com.project.abicoirr.entity.ExternalLinks;
import com.project.abicoirr.entity.Product;
import com.project.abicoirr.entity.ProductImage;
import com.project.abicoirr.exception.BaseException;
import com.project.abicoirr.models.response.AbstractResponse.StatusType;
import com.project.abicoirr.models.response.ApiResponse;
import com.project.abicoirr.repository.ProductRepository;
import com.project.abicoirr.util.Util;
import jakarta.transaction.Transactional;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@Slf4j
public class ProductServiceImpl implements ProductService {

  @Autowired private ProductRepository productRepo;
  @Autowired private CategoryService categoryService;
  @Autowired private AwsService awsService;

  @Override
  @Transactional
  public Product saveProduct(Product product) {
    List<ProductImage> images = product.getImages();
    List<ExternalLinks> links = product.getLinks();

    CategoryEntity linkedCategory = categoryService.getCategoryById(product.getCategory().getId());

    if (linkedCategory == null)
      throw new RuntimeException("No Category is associated with the product");

    product.setCategory(linkedCategory);

    product.setImages(new ArrayList<>());
    product.setLinks(new ArrayList<>());

    Product savedProduct = productRepo.save(product);

    for (ProductImage image : images) image.setProduct(savedProduct);

    savedProduct.setImages(images);

    for (ExternalLinks link : links) link.setProduct(savedProduct);

    savedProduct.setLinks(links);

    return savedProduct;
  }

  @Override
  @Transactional
  public void deleteProductById(Long productId) {
    Product product = getProductById(productId);

    if (product == null) throw new RuntimeException("Product not found");

    List<ProductImage> images = product.getImages();
    List<ExternalLinks> links = product.getLinks();

    for (ProductImage image : images) image.setProduct(null);
    product.getImages().clear();

    for (ExternalLinks link : links) link.setProduct(null);
    links.clear();

    product.getLinks().forEach(link -> link.setProduct(null));
    product.getLinks().clear();

    productRepo.delete(product);
  }

  @Override
  public Product getProductById(Long productId) {
    Optional<Product> product = productRepo.findById(productId);

    if (!product.isPresent()) return null;

    return product.get();
  }

  @Override
  @Transactional
  public Product updateProductById(Long productId, Product product) {
    Product existingProduct = getProductById(productId);

    String productName = product.getProductName();
    String productDesc = product.getProductDescription();
    float productDisc = product.getDiscountPercent();
    float productAvgRat = product.getAvgRating();
    int maxOrder = product.getMaxOrder();
    int minOrder = product.getMinOrder();
    float price = product.getPrice();
    int stockQuantity = product.getStockQuantity();

    if (!Util.isEmpty(productName)) existingProduct.setProductName(productName);

    if (!Util.isEmpty(productDesc)) existingProduct.setProductDescription(productDesc);

    if (Objects.nonNull(productDisc)) existingProduct.setDiscountPercent(productDisc);

    if (Objects.nonNull(productAvgRat)) existingProduct.setAvgRating(productAvgRat);

    if (Objects.nonNull(maxOrder)) existingProduct.setMaxOrder(maxOrder);

    if (Objects.nonNull(minOrder)) existingProduct.setMinOrder(minOrder);

    if (Objects.nonNull(price)) existingProduct.setPrice(price);

    if (Objects.nonNull(stockQuantity)) existingProduct.setStockQuantity(stockQuantity);

    // Update the product_images table
    updateProductImageTable(product, existingProduct);

    // Update the external_Links table
    updateExternalLinksTable(product, existingProduct);

    return productRepo.save(existingProduct);
  }

  private void updateProductImageTable(Product product, Product existingProduct) {
    List<ProductImage> updatedImages = product.getImages();
    if (Objects.nonNull(updatedImages)) {
      List<ProductImage> existingImages = existingProduct.getImages();

      for (ProductImage image : existingImages) image.setProduct(null);

      existingProduct.getImages().clear();

      for (ProductImage updatedImage : updatedImages) {
        updatedImage.setProduct(existingProduct);
        existingProduct.getImages().add(updatedImage);
      }
    }
  }

  private void updateExternalLinksTable(Product product, Product existingProduct) {
    List<ExternalLinks> updatedLinks = product.getLinks();
    if (Objects.nonNull(updatedLinks)) {
      List<ExternalLinks> existingLinks = existingProduct.getLinks();

      for (ExternalLinks link : existingLinks) link.setProduct(null);

      existingProduct.getLinks().clear();

      for (ExternalLinks updatedLink : updatedLinks) {
        updatedLink.setProduct(existingProduct);
        existingProduct.getLinks().add(updatedLink);
      }
    }
  }

  @Override
  public List<Product> getAllProducts() {
    return productRepo.findAll();
  }

  @Override
  public List<Product> searchProduct(String keyword) {
    return productRepo.findByProductNameContainingIgnoreCase(keyword);
  }

  @Override
  public List<Product> getProductsFromSameCategory(Long productId) {
    Product product = getProductById(productId);

    if (product == null) throw new RuntimeException("Product not found");

    CategoryEntity category = product.getCategory();

    if (category == null) throw new RuntimeException("Product does not have a Category");

    return productRepo.findByCategory(category);
  }

  @Override
  public ApiResponse<?> uploadImage(Long productId, List<MultipartFile> multipartFiles)
      throws BaseException {
    try {
      Product product = getProductById(productId);

      List<ProductImage> productImages = uploadImages(multipartFiles);

      product.getImages().addAll(productImages);
      productRepo.save(product);

      return new ApiResponse<>(IMAGE_UPLOAD_SUCCESS, StatusType.SUCCESS);
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

  @Override
  public ApiResponse<?> deleteImage(String key) throws BaseException {
    try {
      awsService.deleteFile(key);
    } catch (Exception ex) {
      log.error("Error ", ex);
      throw new BaseException(IMAGE_DELETE_FAILED);
    }
    return new ApiResponse<>(IMAGE_DELETE_SUCCESS, StatusType.SUCCESS);
  }
}
