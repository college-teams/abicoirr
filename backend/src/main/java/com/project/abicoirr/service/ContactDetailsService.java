package com.project.abicoirr.service;

import static com.project.abicoirr.codes.ErrorCodes.CONTACT_DETAILS_NOT_FOUND;
import static com.project.abicoirr.codes.SuccessCodes.*;

import com.project.abicoirr.entity.ContactDetails;
import com.project.abicoirr.exception.BaseException;
import com.project.abicoirr.models.ContactDetails.ContactDetailsResponse;
import com.project.abicoirr.models.ContactDetails.CreateContactDetailsRequest;
import com.project.abicoirr.models.ContactDetails.MessageCount;
import com.project.abicoirr.models.response.AbstractResponse;
import com.project.abicoirr.models.response.ApiResponse;
import com.project.abicoirr.repository.ContactDetailsRepository;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor(onConstructor = @__({@Autowired}))
public class ContactDetailsService {

  private final ContactDetailsRepository contactDetailsRepository;

  public ApiResponse<List<ContactDetailsResponse>> getContactDetailsList() {
    List<ContactDetails> contactDetailsBox = contactDetailsRepository.findAll();
    List<ContactDetailsResponse> contactDetailsList =
        ContactDetailsResponse.from(contactDetailsBox);
    return new ApiResponse<>(
        CONTACT_DETAILS_LIST_FETCHED, AbstractResponse.StatusType.SUCCESS, contactDetailsList);
  }

  public ApiResponse<ContactDetailsResponse> getContactDetails(Long contactDetailsId)
      throws BaseException {
    ContactDetails contactDetailsData = getContactDetailsById(contactDetailsId);

    updateReadDetails(contactDetailsData);

    ContactDetailsResponse contactDetails = ContactDetailsResponse.from(contactDetailsData);
    return new ApiResponse<>(
        CONTACT_DETAILS_LIST_FETCHED, AbstractResponse.StatusType.SUCCESS, contactDetails);
  }

  public ApiResponse<ContactDetailsResponse> addContactDetails(
      CreateContactDetailsRequest createContactDetailsRequest) {

    ContactDetails contactDetails = CreateContactDetailsRequest.from(createContactDetailsRequest);
    contactDetailsRepository.save(contactDetails);

    ContactDetailsResponse contactDetailsResponse = ContactDetailsResponse.from(contactDetails);
    return new ApiResponse<>(
        CONTACT_DETAILS_CREATED, AbstractResponse.StatusType.SUCCESS, contactDetailsResponse);
  }

  public ContactDetails getContactDetailsById(Long id) throws BaseException {
    Optional<ContactDetails> contactDetails = contactDetailsRepository.findById(id);

    if (contactDetails.isEmpty()) {
      throw new BaseException(CONTACT_DETAILS_NOT_FOUND);
    }

    return contactDetails.get();
  }

  public ApiResponse<MessageCount> getUnreadMessageCount() {
    Long count = contactDetailsRepository.countFindByIsReadIsFalse();
    MessageCount messageCount = MessageCount.from(count);
    return new ApiResponse<>(
        UN_READ_MESSAGE_LIST_COUNT_FETCHED, AbstractResponse.StatusType.SUCCESS, messageCount);
  }

  private void updateReadDetails(ContactDetails contactDetails) {
    contactDetails.setRead(true);
    contactDetailsRepository.save(contactDetails);
  }
}
