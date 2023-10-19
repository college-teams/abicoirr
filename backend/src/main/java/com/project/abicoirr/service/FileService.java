package com.project.abicoirr.service;

import static com.project.abicoirr.codes.ErrorCodes.EMPTY_FILE_REQUEST;
import static com.project.abicoirr.codes.ErrorCodes.IMAGE_DELETE_FAILED;
import static com.project.abicoirr.codes.ErrorCodes.IMAGE_UPLOAD_FAILED;
import static com.project.abicoirr.codes.SuccessCodes.IMAGE_DELETE_SUCCESS;
import static com.project.abicoirr.codes.SuccessCodes.IMAGE_UPLOAD_SUCCESS;

import com.project.abicoirr.exception.BaseException;
import com.project.abicoirr.models.File.FileResponse;
import com.project.abicoirr.models.response.AbstractResponse;
import com.project.abicoirr.models.response.ApiResponse;
import com.project.abicoirr.util.Util;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@Slf4j
@RequiredArgsConstructor(onConstructor = @__({@Autowired}))
public class FileService {

  private final AwsService awsService;

  public ApiResponse<FileResponse> uploadImage(String entityKey, MultipartFile multipartFile)
      throws BaseException {

    if (multipartFile.isEmpty()) {
      throw new BaseException(EMPTY_FILE_REQUEST);
    }
    String uniqueKey = Util.generateUniqueImageKey(entityKey, multipartFile.getOriginalFilename());
    try {
      String imagePath = awsService.uploadFile(uniqueKey, multipartFile);
      return new ApiResponse<>(
          IMAGE_UPLOAD_SUCCESS,
          AbstractResponse.StatusType.SUCCESS,
          FileResponse.from(uniqueKey, imagePath, entityKey));
    } catch (Exception ex) {
      log.info("Rollback the uploaded images");
      deleteImage(uniqueKey);
      log.error("Unknown exception occurred while uploading image to aws {}", ex.getMessage());
      log.error("ERROR STACK", ex);
      throw new BaseException(IMAGE_UPLOAD_FAILED);
    }
  }

  public ApiResponse<?> deleteImage(String key) throws BaseException {
    try {
      awsService.deleteFile(key);
    } catch (Exception ex) {
      log.error("Error ", ex);
      throw new BaseException(IMAGE_DELETE_FAILED);
    }
    return new ApiResponse<>(IMAGE_DELETE_SUCCESS, AbstractResponse.StatusType.SUCCESS);
  }

  public ApiResponse<List<FileResponse>> uploadImages(
      String entityKey, List<MultipartFile> multipartFiles) throws BaseException {
    try {
      List<FileResponse> fileResponses = new ArrayList<>();

      for (MultipartFile multipartFile : multipartFiles) {
        if (!multipartFile.isEmpty()) {
          String uniqueKey =
              Util.generateUniqueImageKey(entityKey, multipartFile.getOriginalFilename());
          String imagePath = awsService.uploadFile(uniqueKey, multipartFile);
          fileResponses.add(FileResponse.from(uniqueKey, imagePath, entityKey));
        }
      }

      return new ApiResponse<>(
          IMAGE_UPLOAD_SUCCESS, AbstractResponse.StatusType.SUCCESS, fileResponses);
    } catch (Exception ex) {
      log.info("Rollback the uploaded images");
      deleteImages(
          multipartFiles.stream()
              .filter(file -> !file.isEmpty())
              .map(file -> Util.generateUniqueImageKey(entityKey, file.getOriginalFilename()))
              .collect(Collectors.toList()));

      log.error("Unknown exception occurred while uploading images to aws {}", ex.getMessage());
      throw new BaseException(IMAGE_UPLOAD_FAILED);
    }
  }

  public void deleteImages(List<String> keys) throws BaseException {
    try {
      awsService.deleteFiles(keys);
    } catch (Exception ex) {
      log.error("Error ", ex);
      throw new BaseException(IMAGE_DELETE_FAILED);
    }
    new ApiResponse<>(IMAGE_DELETE_SUCCESS, AbstractResponse.StatusType.SUCCESS);
  }
}
