package com.project.abicoirr.repository;

import com.project.abicoirr.entity.User;
import java.util.Optional;

public interface UserRepository extends AbstractRepository<User> {

  Optional<User> findByEmail(String email);

  Optional<User> findByConfirmationToken(String confirmationToken);
}
