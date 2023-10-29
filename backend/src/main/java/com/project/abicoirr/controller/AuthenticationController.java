package com.project.abicoirr.controller;

import com.project.abicoirr.models.Authentication.AuthenticationRequest;
import com.project.abicoirr.models.Authentication.AuthenticationResponse;
import com.project.abicoirr.models.Authentication.RegisterRequest;
import com.project.abicoirr.models.Authentication.UserSignupResponse;
import com.project.abicoirr.service.AuthenticationService;
import com.project.abicoirr.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {

  private final AuthenticationService service;
  private final EmailService emailService;

  @PostMapping("/register")
  public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request)
      throws IllegalAccessException {
    return ResponseEntity.ok(service.register(request));
  }

  @PostMapping("/authenticate")
  public ResponseEntity<AuthenticationResponse> authenticate(
      @RequestBody AuthenticationRequest request) {
    return ResponseEntity.ok(service.authenticate(request));
  }

  @GetMapping("/confirm")
  public ResponseEntity<UserSignupResponse> signupConfirmation(
          @RequestParam("confirmationId") String confirmationId)
      throws IllegalAccessException {
    return ResponseEntity.ok(service.signupConfirmation(confirmationId));
  }
}
