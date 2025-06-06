package com.project.abicoirr.controller;

import com.project.abicoirr.exception.BaseException;
import com.project.abicoirr.models.response.ApiResponse;
import com.project.abicoirr.service.FileService;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/file")
@RequiredArgsConstructor(onConstructor = @__({@Autowired}))
public class FileController {

  private final FileService fileService;

  @PostMapping
  @PreAuthorize("@accessControlService.isAdmin()")
  public ResponseEntity<ApiResponse<?>> uploadImage(
      @RequestParam(name = "entityKey") String entityKey,
      @RequestParam("file") MultipartFile multipartFile)
      throws BaseException {
    return new ResponseEntity<>(fileService.uploadImage(entityKey, multipartFile), HttpStatus.OK);
  }

  @PostMapping("bulk-upload")
  @PreAuthorize("@accessControlService.isAdmin()")
  public ResponseEntity<ApiResponse<?>> uploadImages(
      @RequestParam(name = "entityKey") String entityKey,
      @RequestParam("files") List<MultipartFile> multipartFiles)
      throws BaseException {
    return new ResponseEntity<>(fileService.uploadImages(entityKey, multipartFiles), HttpStatus.OK);
  }

  @DeleteMapping
  @PreAuthorize("@accessControlService.isAdmin()")
  public ResponseEntity<ApiResponse<?>> deleteImage(@Valid @RequestParam("imageKey") String key)
      throws BaseException {
    return new ResponseEntity<>(fileService.deleteImage(key), HttpStatus.OK);
  }
}
