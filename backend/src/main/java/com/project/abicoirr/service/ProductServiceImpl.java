package com.project.abicoirr.service;

import com.project.abicoirr.entity.Product;
import com.project.abicoirr.repository.ProductRepository;
import java.util.Objects;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductServiceImpl implements ProductService {

  @Autowired private ProductRepository productRepo;

  @Override
  public Product saveProduct(Product product) {
    return productRepo.save(product);
  }

  @Override
  public void deleteProductById(Long productId) {
    productRepo.deleteById(productId);
  }

  @Override
  public Product getProductById(Long productId) {
    Optional<Product> product = productRepo.findById(productId);

    if (!product.isPresent()) return null;

    return product.get();
  }

  @Override
  public Product updateProductById(Long productId, Product product) {
    Optional<Product> productsFromDb = productRepo.findById(productId);

    if (!productsFromDb.isPresent()) return null;

    String productname = product.getProductname();
    String productDesc = product.getProductDescription();
    float productDisc = product.getDiscountPercent();
    float productAvgRat = product.getAvgRating();
    int maxOrder = product.getMaxOrder();
    int minOrder = product.getMinOrder();
    float price = product.getPrice();
    int stockQuantity = product.getStockQuantity();

    Product productFromDb = productsFromDb.get();

    if (Objects.nonNull(productname) && !"".equals(productname))
      productFromDb.setProductname(productname);
    if (Objects.nonNull(productDesc) && !"".equals(productDesc))
      productFromDb.setProductDescription(productDesc);
    if (Objects.nonNull(productDisc)) productFromDb.setDiscountPercent(productDisc);
    if (Objects.nonNull(productAvgRat)) productFromDb.setAvgRating(productAvgRat);
    if (Objects.nonNull(maxOrder)) productFromDb.setMaxOrder(maxOrder);
    if (Objects.nonNull(minOrder)) productFromDb.setMinOrder(minOrder);
    if (Objects.nonNull(price)) productFromDb.setPrice(price);
    if (Objects.nonNull(stockQuantity)) productFromDb.setStockQuantity(stockQuantity);

    return productRepo.save(productFromDb);
  }
}
