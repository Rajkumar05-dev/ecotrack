package com.learn.ecotrack.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.learn.ecotrack.Entities.RecycleRequest;

public interface RecycleRequestRepository extends JpaRepository<RecycleRequest, Integer> {
   List<RecycleRequest> findByUserId (String useId);
	
}
