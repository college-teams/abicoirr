package com.project.abicoirr.models.File;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class FileResponse {
  private String entityKey;
  private String imagePath;
  private String imageKey;

  public static FileResponse from(String imageKey, String imagePath, String entityKey) {
    return FileResponse.builder()
        .imageKey(imageKey)
        .entityKey(entityKey)
        .imagePath(imagePath)
        .build();
  }
}
