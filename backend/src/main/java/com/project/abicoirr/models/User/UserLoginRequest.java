package com.project.abicoirr.models.User;

import com.project.abicoirr.annotations.Email;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserLoginRequest {

  @NotNull @Email() private String email;

  @NotNull private String password;
}
