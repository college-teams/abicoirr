package com.project.abicoirr.models.User;

import com.project.abicoirr.entity.User;
import com.project.abicoirr.util.Role;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserRegisterRequest {

  @NotNull private String firstName;
  @NotNull private String lastName;
  @NotNull private String email;
  @NotNull private String password;
  @NotNull private Role role;

  public static User from(UserRegisterRequest userRegisterRequest) {
    User user = new User();
    user.setEmail(userRegisterRequest.getEmail());
    user.setFirstName(userRegisterRequest.getFirstName());
    user.setLastName(userRegisterRequest.getLastName());
    user.setPassword(userRegisterRequest.getPassword());
    user.setRole(userRegisterRequest.getRole());

    return user;
  }
}
