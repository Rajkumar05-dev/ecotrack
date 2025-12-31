package com.learn.ecotrack.Services.impl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.learn.ecotrack.Dtos.EnrollmentsDto;
import com.learn.ecotrack.Entities.Enrollments;
import com.learn.ecotrack.Entities.User;
import com.learn.ecotrack.Entities.WorkShop;
import com.learn.ecotrack.Exception.NotFoundException;
import com.learn.ecotrack.Repository.EnrollmentRepository;
import com.learn.ecotrack.Repository.UserRespository;
import com.learn.ecotrack.Repository.WorkShopRespository;
import com.learn.ecotrack.Services.EnrollmentService;

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
	@Override
	public EnrollmentsDto enroll(String userId, int workShopId) {
	if(enrollmentRepository.existsByUserIdAndWorkShopId(userId, workShopId)) 
		throw new RuntimeException("user has alreay enroll");
	User user = userRespository.findById(userId).orElseThrow(()-> new NotFoundException("User  Not found"));
	WorkShop  workshop = workShopRespository.findById(workShopId).orElseThrow(()-> new NotFoundException("Workshop   not found"));
	Enrollments enrollments = new Enrollments();
	enrollments.setUser(user);
	enrollments.setWorkShop(workshop);
	
	Enrollments savedEnrollment = enrollmentRepository.save(enrollments);
		return modelMapper.map(savedEnrollment, EnrollmentsDto.class);
	}

}
