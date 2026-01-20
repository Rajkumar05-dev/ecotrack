package com.learn.ecotrack.Controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.learn.ecotrack.Dtos.EnrollmentsDto;
import com.learn.ecotrack.Services.EnrollmentService;
import com.learn.ecotrack.Services.RazorpayService;
import com.learn.ecotrack.Services.UserService;
import com.learn.ecotrack.Services.WorkShopService;
import com.razorpay.RazorpayException;


@RestController
@RequestMapping("/enroll")
@CrossOrigin
public class EnrollmentController {

	@Autowired
	private WorkShopService workShopService;
	
	@Autowired
	private RazorpayService razorpayService;
	
	@Autowired
	private UserService userService;
	@Autowired
	private EnrollmentService  enrollmentService;
	
 
	
	@PostMapping("/{userId}/enroll/{workShopId}")
	public ResponseEntity<EnrollmentsDto> addenroll( @PathVariable String userId, @PathVariable  int workShopId){
		return ResponseEntity.ok(enrollmentService.enroll(userId,workShopId));
	}
	@PostMapping("/confirm")
	public ResponseEntity<String> confirmEnrollment(@RequestBody Map<String, String> payload)  throws RazorpayException {
		boolean verified = razorpayService.verifyPayment(payload.get("razorpayOrderId"), payload.get("razorpayPaymentId"), payload.get("razorpaySignature"));
		
		if(!verified) {
			return ResponseEntity.badRequest().body("Payment Varification Failed");
		}
		
		enrollmentService.ConfrimPayment(payload.get("razorpayOrderId"), payload.get("razorpayPaymentId"));
		return ResponseEntity.ok("Enrollment succesfull");
	}
}
