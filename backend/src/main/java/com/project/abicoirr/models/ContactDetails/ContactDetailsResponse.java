package com.project.abicoirr.models.ContactDetails;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.project.abicoirr.entity.ContactDetails;
import java.util.List;
import java.util.stream.Collectors;
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
public class ContactDetailsResponse {
  private Long id;
  private String name;
  private String email;
  private String phoneNumber;
  private String message;

  public static List<ContactDetailsResponse> from(List<ContactDetails> contactDetailsBox) {
    return contactDetailsBox.stream()
        .map(ContactDetailsResponse::from)
        .collect(Collectors.toList());
  }

  public static ContactDetailsResponse from(ContactDetails contactDetails) {
    return ContactDetailsResponse.builder()
        .id(contactDetails.getId() > 0 ? contactDetails.getId() : null)
        .name(contactDetails.getName())
        .email(contactDetails.getEmail())
        .phoneNumber(contactDetails.getPhone_number())
        .message(contactDetails.getMessage())
        .build();
  }
}
