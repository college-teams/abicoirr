package com.project.abicoirr.codes;

import com.project.abicoirr.models.response.StatusCodes;
import org.springframework.http.HttpStatus;

public class SuccessCodes extends StatusCodes {
  private static final String RESOURCE_BUNDLE_NAME = "AbicoirrSuccessCodes";

  public static final StatusCodes ADMIN_ORDER_LIST_FETCHED =
      new SuccessCodes(200, HttpStatus.OK, "ADMIN_ORDER_LIST_FETCHED");

  public static final StatusCodes DELETE_SUCCESS =
      new SuccessCodes(200, HttpStatus.OK, "DELETE_SUCCESS");

  public static final StatusCodes ADMIN_ORDER_DELETE_SUCCESS =
      new SuccessCodes(200, HttpStatus.OK, "ADMIN_ORDER_DELETE_SUCCESS");

  public static final StatusCodes ADMIN_ORDER_CREATED =
      new SuccessCodes(200, HttpStatus.CREATED, "ADMIN_ORDER_CREATED");

  public static final StatusCodes ADMIN_ORDER_UPDATED =
      new SuccessCodes(200, HttpStatus.OK, "ADMIN_ORDER_UPDATED");

  public static final StatusCodes IMAGE_UPLOAD_SUCCESS =
      new SuccessCodes(200, HttpStatus.OK, "IMAGE_UPLOAD_SUCCESS");

  public static final StatusCodes IMAGE_DELETE_SUCCESS =
      new SuccessCodes(200, HttpStatus.OK, "IMAGE_DELETE_SUCCESS");
  public static final StatusCodes CATEGORY_LIST_FETCHED =
      new SuccessCodes(200, HttpStatus.OK, "CATEGORY_LIST_FETCHED");

  public static final StatusCodes CATEGORY_DELETE_SUCCESS =
      new SuccessCodes(200, HttpStatus.OK, "CATEGORY_DELETE_SUCCESS");

  public static final StatusCodes CATEGORY_CREATED =
      new SuccessCodes(200, HttpStatus.CREATED, "CATEGORY_CREATED");

  public static final StatusCodes CATEGORY_UPDATED =
      new SuccessCodes(200, HttpStatus.OK, "CATEGORY_UPDATED");

  public static final StatusCodes CONTACT_DETAILS_LIST_FETCHED =
      new SuccessCodes(200, HttpStatus.OK, "CONTACT_DETAILS_LIST_FETCHED");

  public static final StatusCodes UN_READ_MESSAGE_LIST_COUNT_FETCHED =
      new SuccessCodes(200, HttpStatus.OK, "UN_READ_MESSAGE_LIST_COUNT_FETCHED");

  public static final StatusCodes CONTACT_DETAILS_CREATED =
      new SuccessCodes(200, HttpStatus.CREATED, "CONTACT_DETAILS_CREATED");

  public static final StatusCodes PRODUCT_LIST_FETCHED =
      new SuccessCodes(200, HttpStatus.OK, "PRODUCT_LIST_FETCHED");

  public static final StatusCodes LATEST_PRODUCT_LIST_FETCHED =
      new SuccessCodes(200, HttpStatus.OK, "LATEST_PRODUCT_LIST_FETCHED");

  public static final StatusCodes POPULAR_PRODUCT_LIST_FETCHED =
      new SuccessCodes(200, HttpStatus.OK, "POPULAR_PRODUCT_LIST_FETCHED");

  public static final StatusCodes PRODUCT_CREATED =
      new SuccessCodes(200, HttpStatus.CREATED, "PRODUCT_CREATED");

  public static final StatusCodes PRODUCT_UPDATED =
      new SuccessCodes(200, HttpStatus.OK, "PRODUCT_UPDATED");

  public static final StatusCodes PRODUCT_DELETE_SUCCESS =
      new SuccessCodes(200, HttpStatus.OK, "PRODUCT_DELETE_SUCCESS");

  public static final StatusCodes ENTITIES_ITEM_COUNT_FETCHED =
      new SuccessCodes(200, HttpStatus.OK, "ENTITIES_ITEM_COUNT_FETCHED");

  public static final StatusCodes USER_REGISTER_SUCCESS =
      new SuccessCodes(201, HttpStatus.CREATED, "USER_REGISTER_SUCCESS");

  public static final StatusCodes USER_LOGIN_SUCCESS =
      new SuccessCodes(200, HttpStatus.OK, "USER_LOGIN_SUCCESS");

  public static final StatusCodes ACCOUNT_ALREADY_EXISTS =
      new SuccessCodes(200, HttpStatus.OK, "ACCOUNT_ALREADY_EXISTS");

  public static final StatusCodes FORGOT_PASSWORD_REQUEST_SENDS =
      new SuccessCodes(200, HttpStatus.OK, "FORGOT_PASSWORD_REQUEST_SENDS");

  public SuccessCodes(int statusCode, HttpStatus httpStatusCode, String internalKey) {
    setAll(statusCode, httpStatusCode, internalKey, RESOURCE_BUNDLE_NAME);
  }
}
