package com.learn.ecotrack.Services.impl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.learn.ecotrack.Dtos.EnrollmentsDto;
import com.learn.ecotrack.Entities.Enrollments;
import com.learn.ecotrack.Entities.User;
import com.learn.ecotrack.Entities.WorkShop;
import com.learn.ecotrack.Enum.PaymentStatus;
import com.learn.ecotrack.Exception.NotFoundException;
import com.learn.ecotrack.Repository.EnrollmentRepository;
import com.learn.ecotrack.Repository.UserRespository;
import com.learn.ecotrack.Repository.WorkShopRespository;
import com.learn.ecotrack.Services.EmailService;
import com.learn.ecotrack.Services.EnrollmentService;
import com.learn.ecotrack.Services.RazorpayService;
import com.razorpay.Order;
import com.razorpay.RazorpayException;

@Service
public class EnrollmentsServiceImpl  implements EnrollmentService{
	@Autowired 
	
 private EnrollmentRepository enrollmentRepository;
	@Autowired
	private UserRespository userRespository;
	@Autowired
	private WorkShopRespository workShopRespository;
	@Autowired 
	private ModelMapper modelMapper;
	@Autowired
	private EmailService emailService; 
	@Autowired
	private RazorpayService razorpayService;
	@Override
	public EnrollmentsDto enroll(String userId, int workShopId) {
	if(enrollmentRepository.existsByUserIdAndWorkShopId(userId, workShopId)) 
		throw new RuntimeException("user has alreay enroll");
	User user = userRespository.findById(userId).orElseThrow(()-> new NotFoundException("User  Not found"));
	WorkShop  workshop = workShopRespository.findById(workShopId).orElseThrow(()-> new NotFoundException("Workshop   not found"));
	
	Order order;
	try {
		order = razorpayService.createOrder(workshop.getPrice());
	} catch (RazorpayException e) {
		throw new RuntimeException("Unable to create razorpay order");
	}
	
	
	
	Enrollments enrollments = new Enrollments();
	enrollments.setUser(user);
	enrollments.setWorkShop(workshop);;
	enrollments.setAmount(workshop.getPrice());;
	enrollments.setPaymentStatus(PaymentStatus.CREATED);
	enrollments.setRazorpayOrderId(order.get("id"));
	
	
	Enrollments savedEnrollment = enrollmentRepository.save(enrollments);
	emailService.sendEmail("priyanka.vibhute@itvedant.com","congratulationas !enrillment complete", "Thanks for enrolling"+workshop.getName());
		return modelMapper.map(savedEnrollment, EnrollmentsDto.class);
	}
	@Override
	public void ConfrimPayment(String orderId, String paymentId) {
		Enrollments enrollment = enrollmentRepository.findByRazorpayOrderId(orderId).orElseThrow(() -> new NotFoundException("Enrollment Not Found"));
		enrollment.setRazorpayPaymentId(paymentId);
		enrollment.setPaymentStatus(PaymentStatus.SUCCESS);
		
		enrollmentRepository.save(enrollment);
		
	}

}
