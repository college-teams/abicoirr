package com.project.abicoirr.service;

import com.project.abicoirr.config.JwtService;
import com.project.abicoirr.entity.User;
import com.project.abicoirr.models.Authentication.AuthenticationRequest;
import com.project.abicoirr.models.Authentication.AuthenticationResponse;
import com.project.abicoirr.models.Authentication.RegisterRequest;
import com.project.abicoirr.models.Authentication.UserSignupResponse;
import com.project.abicoirr.repository.UserRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;
  private final AuthenticationManager authenticationManager;
  private final EmailService emailService;

  public AuthenticationResponse register(RegisterRequest request) throws IllegalAccessException {

    Optional<User> userByEmail = userRepository.findByEmail(request.getEmail());

    if (userByEmail.isPresent()) {
      throw new RuntimeException("User already exists!!");
    }
    var user =
        User.builder()
            .firstname(request.getFirstname())
            .lastname(request.getLastname())
            .email(request.getEmail())
            .password(passwordEncoder.encode(request.getPassword()))
            .role(request.getRole())
                .confirmationId(generateConfirmationId())
                .emailVerification(false)
            .build();
    userRepository.save(user);
    var jwtToken = jwtService.generateToken(user);
    return AuthenticationResponse.builder().token(jwtToken).role(request.getRole()).build();
  }

  public AuthenticationResponse authenticate(AuthenticationRequest request) {
    authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
    var user = userRepository.findByEmail(request.getEmail()).get();
    if(!user.isEmailVerification()){
      throw new RuntimeException("User is not Verified");
    }
    var jwtToken = jwtService.generateToken(user);
    return AuthenticationResponse.builder().token(jwtToken).build();

  }

  public UserSignupResponse signupConfirmation(String confirmationId) {
    Optional<User> userByConfirmationId = userRepository.findByConfirmationId(confirmationId);
    if (userByConfirmationId.isPresent()) {
      if(userByConfirmationId.get().isEmailVerification())
      {
        throw new RuntimeException("User already verified");
      }
      userByConfirmationId.get().setEmailVerification(true);
      userRepository.save(userByConfirmationId.get());
      return UserSignupResponse.builder().message("Your are sucessfully signed up").build();
    }else {
      throw new RuntimeException("Id does not match! Please enter a valid ID");
    }
  }

  public String generateConfirmationId()
  {
    String Cid = "235698";
    return Cid;
  }

}
