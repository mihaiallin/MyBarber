package com.mybarber.repository;

import com.mybarber.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.OptionalInt;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByName(String name);

    Optional<User> findByEmail(String email);

    User findByEmailIgnoreCase(String email);

    User findByNameIgnoreCase(String Title);
}
