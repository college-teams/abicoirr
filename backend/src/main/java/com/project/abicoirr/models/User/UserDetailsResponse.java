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
  private long id;
  private String firstName;
  private String lastName;
  private String email;
  private String phoneNumber;
  private Role role;

  public static List<UserDetailsResponse> from(List<User> users) {
    return users.stream().map(UserDetailsResponse::from).collect(Collectors.toList());
  }

  public static UserDetailsResponse from(User user) {
    UserDetailsResponse userResponse = new UserDetailsResponse();
    userResponse.setId(user.getId());
    userResponse.setEmail(user.getEmail());
    userResponse.setFirstName(user.getFirstName());
    userResponse.setLastName(user.getLastName());
    userResponse.setRole(user.getRole());
    userResponse.setPhoneNumber(user.getPhoneNumber());

    return userResponse;
  }
}
