package com.project.abicoirr.codes;

import com.project.abicoirr.models.response.StatusCodes;
import org.springframework.http.HttpStatus;

public class ErrorCodes extends StatusCodes {

  private static final String RESOURCE_BUNDLE_NAME = "AbicoirrErrorCodes";
  public static final StatusCodes CONSTRAINT_VIOLATIONS =
      new ErrorCodes(400, HttpStatus.BAD_REQUEST, "CONSTRAINT_VIOLATIONS");

  public static final StatusCodes UNAUTHORIZED =
      new ErrorCodes(401, HttpStatus.UNAUTHORIZED, "UNAUTHORIZED");

  public static final StatusCodes FORBIDDEN =
      new ErrorCodes(403, HttpStatus.FORBIDDEN, "FORBIDDEN");

  public static final StatusCodes ADMIN_ORDER_NOT_FOUND =
      new ErrorCodes(404, HttpStatus.NOT_FOUND, "ADMIN_ORDER_NOT_FOUND");

  public static final StatusCodes CATEGORY_NOT_FOUND =
      new ErrorCodes(404, HttpStatus.NOT_FOUND, "CATEGORY_NOT_FOUND");

  public static final StatusCodes CONTACT_DETAILS_NOT_FOUND =
      new ErrorCodes(404, HttpStatus.NOT_FOUND, "CONTACT_DETAILS_NOT_FOUND");

  public static final StatusCodes EMPTY_FILE_REQUEST =
      new ErrorCodes(400, HttpStatus.BAD_REQUEST, "EMPTY_FILE_REQUEST");
  public static final StatusCodes IMAGE_UPLOAD_FAILED =
      new ErrorCodes(400, HttpStatus.BAD_REQUEST, "IMAGE_UPLOAD_FAILED");

  public static final StatusCodes IMAGE_DELETE_FAILED =
      new ErrorCodes(400, HttpStatus.BAD_REQUEST, "IMAGE_DELETE_FAILED");

  public static final StatusCodes INTERNAL_SERVER_ERROR =
      new ErrorCodes(500, HttpStatus.INTERNAL_SERVER_ERROR, "INTERNAL_SERVER_ERROR");

  public static final StatusCodes PRODUCT_NOT_FOUND =
      new ErrorCodes(404, HttpStatus.NOT_FOUND, "PRODUCT_NOT_FOUND");

  public static final StatusCodes PRODUCT_IMAGE_NOT_FOUND =
      new ErrorCodes(404, HttpStatus.NOT_FOUND, "PRODUCT_IMAGE_NOT_FOUND");

  public static final StatusCodes USER_ALREADY_EXISTS =
      new ErrorCodes(400, HttpStatus.BAD_REQUEST, "USER_ALREADY_EXISTS");

  public static final StatusCodes ACCOUNT_NOT_VERIFIED =
      new ErrorCodes(400, HttpStatus.BAD_REQUEST, "ACCOUNT_NOT_VERIFIED");

  public static final StatusCodes USER_NOT_EXISTS =
      new ErrorCodes(400, HttpStatus.BAD_REQUEST, "USER_NOT_EXISTS");

  public static final StatusCodes ACCOUNT_ALREADY_EXISTS =
      new ErrorCodes(400, HttpStatus.BAD_REQUEST, "ACCOUNT_ALREADY_EXISTS");

  public static final StatusCodes EMAIL_VERIFICATION_FAILED =
      new ErrorCodes(400, HttpStatus.BAD_REQUEST, "EMAIL_VERIFICATION_FAILED");

  public ErrorCodes(int statusCode, HttpStatus httpStatusCode, String internalKey) {
    setAll(statusCode, httpStatusCode, internalKey, RESOURCE_BUNDLE_NAME);
  }
}
