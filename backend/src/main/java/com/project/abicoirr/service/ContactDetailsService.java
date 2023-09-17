package com.project.abicoirr.service;

import com.project.abicoirr.entity.ContactDetails;
import com.project.abicoirr.exception.BaseException;
import com.project.abicoirr.models.ContactDetails.ContactDetailsResponse;
import com.project.abicoirr.models.ContactDetails.CreateContactDetailsRequest;
import com.project.abicoirr.models.response.AbstractResponse;
import com.project.abicoirr.models.response.ApiResponse;
import com.project.abicoirr.repository.ContactDetailsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

import static com.project.abicoirr.codes.ErrorCodes.CATEGORY_NOT_FOUND;
import static com.project.abicoirr.codes.ErrorCodes.CONTACT_DETAILS_NOT_FOUND;
import static com.project.abicoirr.codes.SuccessCodes.CONTACT_DETAILS_CREATED;
import static com.project.abicoirr.codes.SuccessCodes.CONTACT_DETAILS_LIST_FETCHED;

@Service
@Slf4j
@RequiredArgsConstructor(onConstructor = @__({@Autowired}))
public class ContactDetailsService {

    private final ContactDetailsRepository contactDetailsRepository;

    public ApiResponse<List<ContactDetailsResponse>> getContactDetailsList() {
        List<ContactDetails> contactDetailsBox = contactDetailsRepository.findAll();
        List<ContactDetailsResponse> contactDetailsList = ContactDetailsResponse.from(contactDetailsBox);
        return new ApiResponse<>(CONTACT_DETAILS_LIST_FETCHED, AbstractResponse.StatusType.SUCCESS, contactDetailsList);
    }

    public ApiResponse<ContactDetailsResponse> getContactDetails(Long contactDetailsId) throws BaseException {
        ContactDetails contactDetailsData = getContactDetailsById(contactDetailsId);

        ContactDetailsResponse contactDetails = ContactDetailsResponse.from(contactDetailsData);
        return new ApiResponse<>(CONTACT_DETAILS_LIST_FETCHED, AbstractResponse.StatusType.SUCCESS, contactDetails);
    }

    public ApiResponse<ContactDetailsResponse> addContactDetails(CreateContactDetailsRequest createContactDetailsRequest) {

        ContactDetails contactDetails = CreateContactDetailsRequest.from(createContactDetailsRequest);
        contactDetailsRepository.save(contactDetails);

        ContactDetailsResponse contactDetailsResponse = ContactDetailsResponse.from(contactDetails);
        return new ApiResponse<>(CONTACT_DETAILS_CREATED, AbstractResponse.StatusType.SUCCESS, contactDetailsResponse);
    }

    public ContactDetails getContactDetailsById(Long id) throws BaseException {
        Optional<ContactDetails> contactDetails = contactDetailsRepository.findById(id);

        if (contactDetails.isEmpty()) {
            throw new BaseException(CONTACT_DETAILS_NOT_FOUND);
        }

        return contactDetails.get();
    }


}
