package com.project.abicoirr;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class AbicoirrApplication {

  public static void main(String[] args) {
    SpringApplication.run(AbicoirrApplication.class, args);
  }
}
