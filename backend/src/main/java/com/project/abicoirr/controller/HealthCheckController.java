package com.project.abicoirr.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthCheckController {

  @GetMapping("/health-check")
  public String getHealthStatus() {
    return "Service is up and running";
  }
}
