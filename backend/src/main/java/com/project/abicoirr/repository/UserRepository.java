package com.project.abicoirr.repository;

import com.project.abicoirr.entity.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {

  Optional<User> findByEmail(String email);

  Optional<User> findByConfirmationToken(String confirmationToken);
}
