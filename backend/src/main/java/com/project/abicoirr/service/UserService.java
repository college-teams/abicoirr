package com.project.abicoirr.service;

import static com.project.abicoirr.codes.ErrorCodes.ACCOUNT_NOT_VERIFIED;
import static com.project.abicoirr.codes.ErrorCodes.USER_ALREADY_EXISTS;
import static com.project.abicoirr.codes.SuccessCodes.USER_LOGIN_SUCCESS;
import static com.project.abicoirr.codes.SuccessCodes.USER_REGISTER_SUCCESS;

import com.project.abicoirr.config.JwtService;
import com.project.abicoirr.entity.User;
import com.project.abicoirr.exception.BaseException;
import com.project.abicoirr.models.Authentication.UserSignupResponse;
import com.project.abicoirr.models.User.UserLoginRequest;
import com.project.abicoirr.models.User.UserLoginResponse;
import com.project.abicoirr.models.User.UserRegisterRequest;
import com.project.abicoirr.models.response.AbstractResponse;
import com.project.abicoirr.models.response.ApiResponse;
import com.project.abicoirr.repository.UserRepository;
import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
import java.util.Optional;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;

@Service
@RequiredArgsConstructor
public class UserService {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;
  private final AuthenticationManager authenticationManager;
  private final EmailService emailService;

  @Transactional
  public ApiResponse<?> register(UserRegisterRequest request)
      throws BaseException, MessagingException {
    Optional<User> userByEmail = userRepository.findByEmail(request.getEmail());

    if (userByEmail.isPresent()) {
      throw new BaseException(USER_ALREADY_EXISTS);
    }

    request.setPassword(passwordEncoder.encode(request.getPassword()));
    var user = UserRegisterRequest.from(request);
    user.setConfirmationToken(generateVerificationCode());

    userRepository.save(user);

    //    send email
    sendVerificationEmail(user);

    return new ApiResponse<>(USER_REGISTER_SUCCESS, AbstractResponse.StatusType.SUCCESS);
  }

  public ApiResponse<UserLoginResponse> authenticate(UserLoginRequest request)
      throws BaseException {
    authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
    var user = userRepository.findByEmail(request.getEmail()).get();

    if (!user.isAccountVerified()) {
      throw new BaseException(ACCOUNT_NOT_VERIFIED);
    }

    var jwtToken = jwtService.generateToken(user);
    return new ApiResponse<>(
        USER_LOGIN_SUCCESS,
        AbstractResponse.StatusType.SUCCESS,
        UserLoginResponse.from(jwtToken, user));
  }

  public UserSignupResponse signupConfirmation(String confirmationToken) {
    Optional<User> userByConfirmationToken =
        userRepository.findByConfirmationToken(confirmationToken);
    if (userByConfirmationToken.isPresent()) {
      if (userByConfirmationToken.get().isAccountVerified()) {
        throw new RuntimeException("User already verified");
      }
      userByConfirmationToken.get().setAccountVerified(true);
      userRepository.save(userByConfirmationToken.get());
      return UserSignupResponse.builder().message("Your are successfully signed up").build();
    } else {
      throw new RuntimeException("Id does not match! Please enter a valid ID");
    }
  }

  private String generateVerificationCode() {
    return UUID.randomUUID().toString();
  }

  private void sendVerificationEmail(User user) throws MessagingException {
    String to = user.getEmail();
    String subject = "Account verification";

    Context context = new Context();
    context.setVariable("Name", "Hello, " + user.getFirstname() + " " + user.getLastname());
    context.setVariable(
        "link",
        "http://localhost:8000/api/v1/users/validate?confirmationToken="
            + user.getConfirmationToken());

    emailService.sendEmail(to, subject, "accountVerification", context);
  }
}
