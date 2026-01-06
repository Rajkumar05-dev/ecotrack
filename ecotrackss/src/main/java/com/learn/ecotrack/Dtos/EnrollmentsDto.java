package com.learn.ecotrack.Dtos;

import java.time.LocalDateTime;


import com.learn.ecotrack.Entities.User;
import com.learn.ecotrack.Entities.WorkShop;
import com.learn.ecotrack.Enum.PaymentStatus;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EnrollmentsDto {
	
	private User user;
	
	private WorkShop workShop;
	
	private LocalDateTime enrolledAt;
	
	
	private Double amount;
	private String razorpayOrderId;
	private String razorpayPaymentId;
	

	private PaymentStatus paymentStatus;
}
