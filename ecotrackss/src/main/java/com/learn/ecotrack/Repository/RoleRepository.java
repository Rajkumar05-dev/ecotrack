package com.learn.ecotrack.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.learn.ecotrack.Entities.Role;
import com.learn.ecotrack.Enum.AppRole;

public interface RoleRepository extends JpaRepository<Role ,Integer> {
	Optional<Role> findByAppRole(AppRole appRole);

}
