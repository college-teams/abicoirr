package com.project.abicoirr.controller;

import com.project.abicoirr.exception.BaseException;
import com.project.abicoirr.models.User.ForgotPasswordRequest;
import com.project.abicoirr.models.User.UserDetailsResponse;
import com.project.abicoirr.models.User.UserLoginRequest;
import com.project.abicoirr.models.User.UserLoginResponse;
import com.project.abicoirr.models.User.UserRegisterRequest;
import com.project.abicoirr.models.response.ApiResponse;
import com.project.abicoirr.service.UserService;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
  private final UserService userService;

  @Value("${application.frontend-url}")
  private String Application_url;

  @GetMapping("/self")
  public ResponseEntity<ApiResponse<UserDetailsResponse>> getLoggedInUserDetails() {
    return new ResponseEntity<>(userService.getUserSelf(), HttpStatus.OK);
  }

  @GetMapping("/")
  @PreAuthorize("@accessControlService.isAdmin()")
  public ResponseEntity<ApiResponse<List<UserDetailsResponse>>> getAllUserDetails() {
    return new ResponseEntity<>(userService.getUserList(), HttpStatus.OK);
  }

  @GetMapping("/{id}")
  @PreAuthorize("@accessControlService.isAdmin()")
  public ResponseEntity<ApiResponse<UserDetailsResponse>> getUserDetails(@PathVariable Long id)
      throws BaseException {
    return new ResponseEntity<>(userService.getUserDetailsById(id), HttpStatus.OK);
  }

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
  public RedirectView signupConfirmation(
      @RequestParam("confirmationToken") String confirmationToken) throws BaseException {
    userService.signupConfirmation(confirmationToken);

    RedirectView redirectView = new RedirectView();
    redirectView.setUrl(Application_url + "/emailVerification");
    return redirectView;
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
