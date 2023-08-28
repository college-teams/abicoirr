package com.project.abicoirr.entity;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@MappedSuperclass
@AllArgsConstructor
@NoArgsConstructor
@Data
public abstract class CommonEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  protected long id;

  @CreationTimestamp
  @Column(name = "created_at", updatable = false, nullable = false)
  protected LocalDateTime createAt;

  @UpdateTimestamp
  @Column(name = "updated_at", updatable = true, nullable = false)
  protected LocalDateTime updatedAt;
}
