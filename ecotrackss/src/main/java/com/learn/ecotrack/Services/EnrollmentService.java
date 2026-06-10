package com.learn.ecotrack.Services;

import java.util.List;

import com.learn.ecotrack.Dtos.EnrollmentsDto;

public interface EnrollmentService {
 EnrollmentsDto enroll(String userId,int workShopId);
 List<EnrollmentsDto> getUserEnrollments(String userId);
 void ConfrimPayment(String orderId,String paymentId);
}
