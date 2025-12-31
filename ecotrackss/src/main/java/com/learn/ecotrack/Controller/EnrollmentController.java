package com.learn.ecotrack.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.learn.ecotrack.Dtos.EnrollmentsDto;
import com.learn.ecotrack.Services.EnrollmentService;


@RestController
@RequestMapping("/enroll")
public class EnrollmentController {

	@Autowired
	private EnrollmentService  enrollmentService;
	
	@PostMapping("/{userId}/enroll/{workShopId}")
	public ResponseEntity<EnrollmentsDto> addenroll( @PathVariable String userId, @PathVariable  int workShopId){
		return ResponseEntity.ok(enrollmentService.enroll(userId,workShopId));
	}
}
