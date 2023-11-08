package com.project.abicoirr.models.User;

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

  public static UserLoginResponse from(String token) {
    UserLoginResponse userLoginResponse = new UserLoginResponse();
    userLoginResponse.setToken(token);

    return userLoginResponse;
  }
}
