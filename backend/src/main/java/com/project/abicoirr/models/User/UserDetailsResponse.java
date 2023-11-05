package com.project.abicoirr.models.User;

import com.project.abicoirr.entity.User;
import com.project.abicoirr.util.Role;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDetailsResponse {

  private String firstname;
  private String lastname;
  private String email;
  private Role role;

  public static List<UserDetailsResponse> from(List<User> users) {
    return users.stream().map(UserDetailsResponse::from).collect(Collectors.toList());
  }

  public static UserDetailsResponse from(User user) {
    UserDetailsResponse userResponse = new UserDetailsResponse();
    userResponse.setEmail(user.getEmail());
    userResponse.setFirstname(user.getFirstname());
    userResponse.setLastname(user.getLastname());
    userResponse.setRole(user.getRole());

    return userResponse;
  }
}
