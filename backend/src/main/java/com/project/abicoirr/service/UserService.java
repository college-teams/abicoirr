package com.project.abicoirr.service;

import static com.project.abicoirr.codes.ErrorCodes.ACCOUNT_ALREADY_EXISTS;
import static com.project.abicoirr.codes.ErrorCodes.ACCOUNT_NOT_VERIFIED;
import static com.project.abicoirr.codes.ErrorCodes.EMAIL_VERIFICATION_FAILED;
import static com.project.abicoirr.codes.ErrorCodes.USER_ALREADY_EXISTS;
import static com.project.abicoirr.codes.ErrorCodes.USER_NOT_EXISTS;
import static com.project.abicoirr.codes.SuccessCodes.All_USER_DETAILS_FETCHED;
import static com.project.abicoirr.codes.SuccessCodes.CURRENT_USER_DETAILS_FETCHED;
import static com.project.abicoirr.codes.SuccessCodes.FORGOT_PASSWORD_REQUEST_SENDS;
import static com.project.abicoirr.codes.SuccessCodes.USER_LOGIN_SUCCESS;
import static com.project.abicoirr.codes.SuccessCodes.USER_REGISTER_SUCCESS;

import com.project.abicoirr.config.JwtService;
import com.project.abicoirr.entity.User;
import com.project.abicoirr.exception.BaseException;
import com.project.abicoirr.models.User.ForgotPasswordRequest;
import com.project.abicoirr.models.User.UserDetailsResponse;
import com.project.abicoirr.models.User.UserLoginRequest;
import com.project.abicoirr.models.User.UserLoginResponse;
import com.project.abicoirr.models.User.UserRegisterRequest;
import com.project.abicoirr.models.response.AbstractResponse;
import com.project.abicoirr.models.response.ApiResponse;
import com.project.abicoirr.repository.UserRepository;
import com.project.abicoirr.util.Role;
import jakarta.annotation.PostConstruct;
import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
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
  private final AccessControlService accessControlService;

  @Value("${application.backend-url}")
  private String Application_url;

  @PostConstruct
  public void adminSetup() {
    Optional<User> userByEmail = userRepository.findByEmail("abicoirr09@gmail.com");
    if (userByEmail.isEmpty()) {
      User user = new User();
      user.setFirstName("Abicoirr");
      user.setEmail("abicoirr09@gmail.com");
      user.setLastName("2023");
      user.setPhoneNumber("7502919281");
      user.setRole(Role.ADMIN);
      user.setAccountVerified(true);
      user.setPassword(passwordEncoder.encode("Crnational6@"));
      userRepository.save(user);
    }
  }

  public ApiResponse<UserDetailsResponse> getUserSelf() {
    User currentUser = accessControlService.getCurrentUser();
    return new ApiResponse<>(
        CURRENT_USER_DETAILS_FETCHED,
        AbstractResponse.StatusType.SUCCESS,
        UserDetailsResponse.from(currentUser));
  }

  public ApiResponse<List<UserDetailsResponse>> getUserList() {
    return new ApiResponse<>(
        All_USER_DETAILS_FETCHED,
        AbstractResponse.StatusType.SUCCESS,
        UserDetailsResponse.from(userRepository.findAll()));
  }

  public ApiResponse<UserDetailsResponse> getUserDetailsById(long userId) throws BaseException {
    User user = getUserById(userId);
    return new ApiResponse<>(
        All_USER_DETAILS_FETCHED,
        AbstractResponse.StatusType.SUCCESS,
        UserDetailsResponse.from(user));
  }

  @Transactional
  public ApiResponse<?> register(UserRegisterRequest request)
      throws BaseException, MessagingException {
    Optional<User> userByEmail = userRepository.findByEmail(request.getEmail());

    var verificationCode = generateVerificationCode();

    if (userByEmail.isPresent()) {
      if (userByEmail.get().isAccountVerified()) {
        throw new BaseException(USER_ALREADY_EXISTS);
      } else {
        userByEmail.get().setConfirmationToken(verificationCode);
        userRepository.save(userByEmail.get());
        sendVerificationEmail(userByEmail.get());
        throw new BaseException(ACCOUNT_ALREADY_EXISTS);
      }
    }

    request.setPassword(passwordEncoder.encode(request.getPassword()));
    var user = UserRegisterRequest.from(request);
    user.setConfirmationToken(verificationCode);
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
        USER_LOGIN_SUCCESS, AbstractResponse.StatusType.SUCCESS, UserLoginResponse.from(jwtToken));
  }

  public void signupConfirmation(String confirmationToken) throws BaseException {
    Optional<User> userByConfirmationToken =
        userRepository.findByConfirmationToken(confirmationToken);
    if (userByConfirmationToken.isPresent()) {
      if (userByConfirmationToken.get().isAccountVerified()) {
        throw new RuntimeException("User already verified");
      }
      userByConfirmationToken.get().setAccountVerified(true);
      userRepository.save(userByConfirmationToken.get());
    } else {
      throw new BaseException(EMAIL_VERIFICATION_FAILED);
    }
  }

  public ApiResponse<?> generateOtpForForgotPassword(ForgotPasswordRequest forgotPasswordRequest)
      throws Exception {
    String email = forgotPasswordRequest.getEmail();
    Optional<User> userByEmail = userRepository.findByEmail(email);
    if (userByEmail.isEmpty()) {
      throw new BaseException(USER_NOT_EXISTS);
    }
    if (!userByEmail.get().isAccountVerified()) {
      throw new BaseException(ACCOUNT_NOT_VERIFIED);
    }

    var user = userByEmail.get();
    String otp = generateOtp();
    user.setOtp(otp);
    user.setOtpValidityTimestamp(System.currentTimeMillis());
    userRepository.save(user);

    sendForgotPasswordEmail(user);

    return new ApiResponse<>(FORGOT_PASSWORD_REQUEST_SENDS, AbstractResponse.StatusType.SUCCESS);
  }

  private String generateVerificationCode() {
    return UUID.randomUUID().toString();
  }

  private void sendVerificationEmail(User user) throws MessagingException {
    String to = user.getEmail();
    String subject = "Account verification";

    Context context = new Context();
    context.setVariable("Name", "Hello, " + user.getFirstName() + " " + user.getLastName());
    context.setVariable(
        "link",
        Application_url
            + "/api/v1/users/validate?confirmationToken="
            + user.getConfirmationToken());

    emailService.sendEmail(to, subject, "accountVerification", context);
  }

  public String generateOtp() {
    Random r = new Random(System.currentTimeMillis());
    return Integer.toString(10000 + r.nextInt(20000));
  }

  public void sendForgotPasswordEmail(User user) throws Exception {

    String to = user.getEmail();
    String subject = "Otp for Forgot password";

    Context context = new Context();
    context.setVariable("Name", "Hello, " + user.getFirstName() + " " + user.getLastName());
    context.setVariable("otp", user.getOtp());

    emailService.sendEmail(to, subject, "forgotPasswordRequest", context);
  }

  public User getUserById(Long id) throws BaseException {
    Optional<User> user = userRepository.findById(id);

    if (user.isEmpty()) {
      throw new BaseException(USER_NOT_EXISTS);
    }
    return user.get();
  }
}
