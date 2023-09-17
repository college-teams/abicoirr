package com.project.abicoirr.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ContactDetails extends CommonEntity {

  @Column(nullable = false)
  private String name;

  @Column(nullable = false)
  private String email;

  @Column(nullable = false)
  private String phoneNumber;

  @Column(nullable = false)
  private String message;

  @Column(nullable = false)
  private boolean isRead = false;
}
