package com.learn.ecotrack.Services;

import com.learn.ecotrack.Dtos.EnrollmentsDto;

public interface EnrollmentService {
 EnrollmentsDto enroll(String userId,int workShopId);
 void ConfrimPayment(String orderId,String paymentId);
}
