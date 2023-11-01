package com.project.abicoirr.models.User;

import com.project.abicoirr.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserLoginResponse {

  private String token;
  private UserResponse user;

  public static UserLoginResponse from(String token, User user) {
    UserLoginResponse userLoginResponse = new UserLoginResponse();
    userLoginResponse.setToken(token);
    userLoginResponse.setUser(UserResponse.from(user));

    return userLoginResponse;
  }
}
