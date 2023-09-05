package com.project.abicoirr.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.PutObjectResult;
import java.io.IOException;
import java.io.InputStream;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor(onConstructor = @__({@Autowired}))
@Slf4j
public class AwsService {

  private static final String BUCKET_NAME = "abicoirr-test";
  private final AmazonS3 amazonS3;

  public String uploadFile(String folderName, MultipartFile multipartFile) throws IOException {
    try (InputStream fileInputStream = multipartFile.getInputStream()) {
      String key = String.format("%s/%s", folderName, multipartFile.getOriginalFilename());

      // Create an ObjectMetadata object and set the Content-Type and content-disposition
      ObjectMetadata metadata = new ObjectMetadata();
      metadata.setContentType(multipartFile.getContentType());
      metadata.setContentDisposition("inline");

      PutObjectRequest putObjectRequest =
          new PutObjectRequest(BUCKET_NAME, key, fileInputStream, metadata);
      PutObjectResult putObjectResult = amazonS3.putObject(putObjectRequest);

      String publicUrl = amazonS3.getUrl(BUCKET_NAME, key).toString();
      log.info("Uploaded file to S3. URL: {}", publicUrl);

      return publicUrl;
    } catch (IOException e) {
      log.error("Error uploading file to S3", e);
      throw e;
    }
  }
}
