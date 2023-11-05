package com.project.abicoirr.service;

import com.project.abicoirr.entity.User;
import com.project.abicoirr.util.Role;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class AccessControlService {

  public boolean isAdmin() {
    User user = getCurrentUser();
    return Role.ADMIN.equals(user.getRole());
  }

  public User getCurrentUser() {
    return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
  }
}
