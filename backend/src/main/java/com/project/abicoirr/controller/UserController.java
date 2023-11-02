package com.project.abicoirr.controller;

import com.project.abicoirr.exception.BaseException;
import com.project.abicoirr.models.Authentication.UserSignupResponse;
import com.project.abicoirr.models.User.ForgotPasswordRequest;
import com.project.abicoirr.models.User.UserLoginRequest;
import com.project.abicoirr.models.User.UserLoginResponse;
import com.project.abicoirr.models.User.UserRegisterRequest;
import com.project.abicoirr.models.response.ApiResponse;
import com.project.abicoirr.service.UserService;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
  private final UserService userService;

  @PostMapping("/register")
  public ResponseEntity<?> register(@Valid @RequestBody UserRegisterRequest request)
      throws BaseException, MessagingException {
    return new ResponseEntity<>(userService.register(request), HttpStatus.CREATED);
  }

  @PostMapping("/login")
  public ResponseEntity<ApiResponse<UserLoginResponse>> authenticate(
      @Valid @RequestBody UserLoginRequest request) throws BaseException {
    return new ResponseEntity<>(userService.authenticate(request), HttpStatus.OK);
  }

  @GetMapping("/validate")
  public ResponseEntity<UserSignupResponse> signupConfirmation(
      @RequestParam("confirmationToken") String confirmationToken) throws IllegalAccessException {
    return ResponseEntity.ok(userService.signupConfirmation(confirmationToken));
  }

  @PostMapping(value = "/forgot-password/otp-generate")
  public ResponseEntity<?> forgotPassword(@RequestBody ForgotPasswordRequest forgotPasswordRequest)
      throws Exception {
    return new ResponseEntity<>(
        userService.generateOtpForForgotPassword(forgotPasswordRequest), HttpStatus.OK);
  }

  // otp verification
  //  @PostMapping(value = "/forgotpassword/reset")
  //  public ResponseEntity<?> resetPassword(@RequestBody OtpVefication data) throws Exception {
  //    return userService.otpVerification(data);
  //  }

  //  @GetMapping("/{userId}")
  //  @PreAuthorize("@accessControlService.isAuthenticated(#userId)")
  //  public ResponseEntity<ApiResponse> getUserById(@PathVariable Long userId) {
  //    UserResponse user = userService.getUserFromId(userId);
  //    return new ResponseEntity<>(ResponseUtil.createResponse("User Fetched Successfully", user,
  // HttpStatus.OK), HttpStatus.OK);
  //  }
}
