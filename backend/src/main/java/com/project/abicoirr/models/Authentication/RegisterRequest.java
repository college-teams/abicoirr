package com.project.abicoirr.models.Authentication;

import com.project.abicoirr.util.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

  private String firstname;
  private String lastname;

  private String email;
  private String password;
  private Role role;
}
