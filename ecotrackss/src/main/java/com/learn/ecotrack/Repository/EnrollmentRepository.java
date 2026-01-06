package com.learn.ecotrack.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.learn.ecotrack.Entities.Enrollments;
import java.util.Optional;


public interface EnrollmentRepository extends JpaRepository<Enrollments, Integer> {
  boolean existsByUserIdAndWorkShopId(String userId,int workShopId);
   Optional<Enrollments> findByRazorpayOrderId(String razorpayOrderId);
}
