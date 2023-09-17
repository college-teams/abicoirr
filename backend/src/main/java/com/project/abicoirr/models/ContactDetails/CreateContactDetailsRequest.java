package com.project.abicoirr.models.ContactDetails;

import com.project.abicoirr.entity.ContactDetails;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateContactDetailsRequest {
  @NotNull private String name;
  @NotNull private String email;
  @NotNull private String phoneNumber;
  @NotNull private String message;

  public static ContactDetails from(CreateContactDetailsRequest createContactDetailsRequest) {
    ContactDetails contactDetails = new ContactDetails();
    contactDetails.setName(createContactDetailsRequest.getName());
    contactDetails.setEmail(createContactDetailsRequest.getEmail());
    contactDetails.setPhone_number(createContactDetailsRequest.getPhoneNumber());
    contactDetails.setMessage(createContactDetailsRequest.getMessage());

    return contactDetails;
  }
}
