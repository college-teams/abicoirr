package com.project.abicoirr.controller;

import com.project.abicoirr.exception.BaseException;
import com.project.abicoirr.models.ContactDetails.ContactDetailsResponse;
import com.project.abicoirr.models.ContactDetails.CreateContactDetailsRequest;
import com.project.abicoirr.models.response.ApiResponse;
import com.project.abicoirr.service.ContactDetailsService;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/contact-details")
@RequiredArgsConstructor(onConstructor = @__({@Autowired}))
public class ContactDetailsController {

  private final ContactDetailsService contactDetailsService;

  @GetMapping("/")
  public ResponseEntity<ApiResponse<List<ContactDetailsResponse>>> getContactDetailsList() {
    return new ResponseEntity<>(contactDetailsService.getContactDetailsList(), HttpStatus.OK);
  }

  @GetMapping("/{id}")
  public ResponseEntity<ApiResponse<ContactDetailsResponse>> getContactDetails(
      @PathVariable Long id) throws BaseException {
    return new ResponseEntity<>(contactDetailsService.getContactDetails(id), HttpStatus.OK);
  }

  @PostMapping("/")
  public ResponseEntity<ApiResponse<ContactDetailsResponse>> addContactDetails(
      @Valid @RequestBody CreateContactDetailsRequest createContactDetailsRequest) {
    return new ResponseEntity<>(
        contactDetailsService.addContactDetails(createContactDetailsRequest), HttpStatus.OK);
  }
}
