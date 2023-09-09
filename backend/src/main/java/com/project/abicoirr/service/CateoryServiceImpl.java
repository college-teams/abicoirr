package com.project.abicoirr.service;

import static com.project.abicoirr.codes.ErrorCodes.IMAGE_DELETE_FAILED;
import static com.project.abicoirr.codes.ErrorCodes.IMAGE_UPLOAD_FAILED;
import static com.project.abicoirr.codes.SuccessCodes.IMAGE_DELETE_SUCCESS;
import static com.project.abicoirr.codes.SuccessCodes.IMAGE_UPLOAD_SUCCESS;

import com.project.abicoirr.entity.CategoryEntity;
import com.project.abicoirr.exception.BaseException;
import com.project.abicoirr.models.response.AbstractResponse;
import com.project.abicoirr.models.response.ApiResponse;
import com.project.abicoirr.repository.CategoryRepository;
import com.project.abicoirr.util.Util;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@Slf4j
public class CateoryServiceImpl implements CategoryService {

  @Autowired private CategoryRepository cateoryRepo;
  @Autowired private AwsService awsService;

  @Override
  public CategoryEntity saveCategory(CategoryEntity category) {
    return cateoryRepo.save(category);
  }

  @Override
  public void deleteCategoryById(Long categoryId) {
    // TODO Auto-generated method stub
    cateoryRepo.deleteById(categoryId);
  }

  @Override
  public CategoryEntity getCategoryById(Long categoryId) {
    // TODO Auto-generated method stub
    Optional<CategoryEntity> category = cateoryRepo.findById(categoryId);

    if (!category.isPresent()) return null;

    return category.get();
  }

  @Override
  public CategoryEntity updateCategoryById(Long categoryId, CategoryEntity category) {
    Optional<CategoryEntity> categorysFromDb = cateoryRepo.findById(categoryId);

    if (!categorysFromDb.isPresent()) return null;

    String categoryname = category.getCategoryname();
    String cateoryDescription = category.getCategoryDescription();

    CategoryEntity categoryFromDb = categorysFromDb.get();

    if (Objects.nonNull(categoryname) && !"".equals(categoryname))
      categoryFromDb.setCategoryname(categoryname);
    if (Objects.nonNull(cateoryDescription) && !"".equals(cateoryDescription))
      categoryFromDb.setCategoryDescription(cateoryDescription);

    return cateoryRepo.save(categoryFromDb);
  }

  @Override
  public List<CategoryEntity> searchCategory(String keyword) {
    return cateoryRepo.findByCategorynameContainingIgnoreCase(keyword);
  }

  @Override
  public ApiResponse<?> uploadImage(Long categoryId, MultipartFile multipartFile)
      throws BaseException {

    String uniqueKey = Util.generateUniqueImageKey("category", multipartFile.getOriginalFilename());

    try {
      CategoryEntity category = getCategoryById(categoryId);

      String categoryImageLink = awsService.uploadFile(uniqueKey, multipartFile);

      category.setImageKey(uniqueKey);
      category.setImagePath(categoryImageLink);
      cateoryRepo.save(category);

      return new ApiResponse<>(IMAGE_UPLOAD_SUCCESS, AbstractResponse.StatusType.SUCCESS);
    } catch (Exception ex) {
      log.info("Rollback the uploaded images");
      deleteImage(uniqueKey);
      log.error("Error ", ex);
      throw new BaseException(IMAGE_UPLOAD_FAILED);
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
    return new ApiResponse<>(IMAGE_DELETE_SUCCESS, AbstractResponse.StatusType.SUCCESS);
  }
}
