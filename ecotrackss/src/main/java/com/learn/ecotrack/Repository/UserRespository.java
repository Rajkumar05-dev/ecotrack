package com.learn.ecotrack.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.learn.ecotrack.Entities.User;

public interface UserRespository extends JpaRepository<User, String> {
  
Optional<User>	findByEmail(String email);
}
