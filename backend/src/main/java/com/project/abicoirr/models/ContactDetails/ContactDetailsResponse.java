package com.project.abicoirr.models.ContactDetails;

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
public class ContactDetailsResponse {

  private String name;
  private String email;
  private String phone_number;
  private String message;

  public static List<ContactDetailsResponse> from(List<ContactDetails> contactDetailsBox) {
    return contactDetailsBox.stream()
        .map(ContactDetailsResponse::from)
        .collect(Collectors.toList());
  }

  public static ContactDetailsResponse from(ContactDetails contactDetails) {
    return ContactDetailsResponse.builder()
        .name(contactDetails.getName())
        .email(contactDetails.getEmail())
        .phone_number(contactDetails.getPhone_number())
        .message(contactDetails.getMessage())
        .build();
  }
}
