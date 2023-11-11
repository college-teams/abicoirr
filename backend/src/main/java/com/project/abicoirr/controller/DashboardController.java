package com.project.abicoirr.controller;

import com.project.abicoirr.models.Dashboard.DashboardEntityItemsCountResponse;
import com.project.abicoirr.models.response.ApiResponse;
import com.project.abicoirr.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/dashboard")
@RequiredArgsConstructor(onConstructor = @__({@Autowired}))
public class DashboardController {

  private final DashboardService dashboardService;

  @GetMapping("/entityItemsCount")
  @PreAuthorize("@accessControlService.isAdmin()")
  public ResponseEntity<ApiResponse<DashboardEntityItemsCountResponse>> getEntityItemsCount() {
    return new ResponseEntity<>(dashboardService.getEntityItemsCount(), HttpStatus.OK);
  }
}
