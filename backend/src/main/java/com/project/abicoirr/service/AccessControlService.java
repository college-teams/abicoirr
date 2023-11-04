package com.project.abicoirr.service;

import com.project.abicoirr.entity.User;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class AccessControlService {

  public boolean isAuthenticated(String userId) {
    User principal = getCurrentUser();
    return userId.equals(String.valueOf(principal.getId()));
  }

  public User getCurrentUser() {
    return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
  }
}
