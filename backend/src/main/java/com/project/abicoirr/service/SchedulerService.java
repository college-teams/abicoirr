package com.project.abicoirr.service;

import com.amazonaws.services.s3.model.S3ObjectSummary;
import com.project.abicoirr.entity.Category;
import com.project.abicoirr.entity.ProductImage;
import com.project.abicoirr.repository.CategoryRepository;
import com.project.abicoirr.repository.ProductImageRepository;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Profile(value = "prod")
@Service
@RequiredArgsConstructor(onConstructor = @__({@Autowired}))
@Slf4j
public class SchedulerService {
  private final AwsService awsService;
  private final ProductImageRepository productImageRepository;
  private final CategoryRepository categoryRepository;

  //  This cron job will run every day at 12 AM (00:00:00)
  @Scheduled(cron = "0 0 * * * *") // This cron expression represents 12 AM every day
  public void cleanupBucket() {
    log.info("Scheduler started for cleanup...");
    try {
      List<S3ObjectSummary> s3Objects = awsService.getBucketObjectsSummary();
      log.info("Total Objects size {}", s3Objects.size());

      for (S3ObjectSummary s3Object : s3Objects) {
        String objectKey = s3Object.getKey();
        String entity = objectKey.split("/")[0];

        switch (entity.toLowerCase()) {
          case "product" -> handleProductImageCleanup(objectKey);
          case "category" -> handleCategoryImageCleanup(objectKey);
          default -> handleUnknownImageCleanup(objectKey);
        }
      }
    } catch (Exception e) {
      log.error("Error while accessing S3 bucket: {}", e.getMessage());
    }
  }

  private void handleProductImageCleanup(String objectKey) {
    try {
      Optional<ProductImage> productImage = productImageRepository.findByImageKey(objectKey);
      if (productImage.isEmpty()) {
        awsService.deleteFile(objectKey);
        log.info("Deleted non-linked product object: {}", objectKey);
      }
    } catch (Exception e) {
      log.error("Error while handling product image cleanup: {}", e.getMessage());
    }
  }

  private void handleCategoryImageCleanup(String objectKey) {
    try {
      Optional<Category> categoryImage = categoryRepository.findByImageKey(objectKey);
      if (categoryImage.isEmpty()) {
        awsService.deleteFile(objectKey);
        log.info("Deleted non-linked category object: {}", objectKey);
      }
    } catch (Exception e) {
      log.error("Error while handling category image cleanup: {}", e.getMessage());
    }
  }

  private void handleUnknownImageCleanup(String objectKey) {
    try {
      awsService.deleteFile(objectKey);
      log.info("Deleted unknown object: {}", objectKey);
    } catch (Exception e) {
      log.error("Error while handling unknown image cleanup: {}", e.getMessage());
    }
  }
}
