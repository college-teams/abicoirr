package com.project.abicoirr.models.ContactDetails;

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
public class MessageCount {
  private Long count;

  public static MessageCount from(Long count) {
    return MessageCount.builder().count(count).build();
  }
}
