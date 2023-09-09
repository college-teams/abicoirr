package com.project.abicoirr.codes;

import com.project.abicoirr.models.response.StatusCodes;
import org.springframework.http.HttpStatus;

public class ErrorCodes extends StatusCodes {

  private static final String RESOURCE_BUNDLE_NAME = "AbicoirrErrorCodes";
  public static final StatusCodes CONSTRAINT_VIOLATIONS =
      new ErrorCodes(400, HttpStatus.BAD_REQUEST, "CONSTRAINT_VIOLATIONS");

  public static final StatusCodes ADMIN_ORDER_NOT_FOUND =
      new ErrorCodes(404, HttpStatus.NOT_FOUND, "ADMIN_ORDER_NOT_FOUND");
  public static final StatusCodes CATEGORY_NOT_FOUND =
      new ErrorCodes(404, HttpStatus.NOT_FOUND, "CATEGORY_NOT_FOUND");
  public static final StatusCodes IMAGE_UPLOAD_FAILED =
      new ErrorCodes(400, HttpStatus.BAD_REQUEST, "IMAGE_UPLOAD_FAILED");
  public static final StatusCodes INTERNAL_SERVER_ERROR =
      new ErrorCodes(500, HttpStatus.INTERNAL_SERVER_ERROR, "INTERNAL_SERVER_ERROR");

  public ErrorCodes(int statusCode, HttpStatus httpStatusCode, String internalKey) {
    setAll(statusCode, httpStatusCode, internalKey, RESOURCE_BUNDLE_NAME);
  }
}
