package com.project.abicoirr.models.User;

import com.project.abicoirr.entity.User;
import com.project.abicoirr.util.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {

  private String firstname;
  private String lastname;
  private String email;
  private Role role;

  public static UserResponse from(User user) {
    UserResponse userResponse = new UserResponse();
    userResponse.setEmail(user.getEmail());
    userResponse.setFirstname(user.getFirstname());
    userResponse.setLastname(user.getLastname());
    userResponse.setRole(user.getRole());

    return userResponse;
  }
}
