package com.learn.ecotrack.Services.impl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.learn.ecotrack.Dtos.RecycleRequestDto;
import com.learn.ecotrack.Entities.RecycleRequest;
import com.learn.ecotrack.Entities.User;
import com.learn.ecotrack.Enum.RequestStatus;
import com.learn.ecotrack.Exception.NotFoundException;
import com.learn.ecotrack.Repository.RecycleRequestRepository;
import com.learn.ecotrack.Repository.UserRespository;
import com.learn.ecotrack.Services.RecycleRequestService;

@Service
public class RecycleRequestServiceImpl implements RecycleRequestService {

   

	@Autowired
	 private ModelMapper modelMapper;
	@Autowired
	private RecycleRequestRepository recycleRequestRepository;
	@Autowired
	private UserRespository userRespository;

   
	@Override
	public RecycleRequestDto addRequest(RecycleRequestDto recycleRequestDto ,String userId) {
	User user = userRespository.findById(userId).orElseThrow(()->new NotFoundException("user not found"));
	 RecycleRequest request = modelMapper.map(recycleRequestDto,RecycleRequest.class); 
	 request.setUser(user);
	 request.setRequestStatus(RequestStatus.PENDING);
	 RecycleRequest savedRequest= recycleRequestRepository.save(request);
		return modelMapper.map(savedRequest, RecycleRequestDto.class);
	}


	@Override
	public RecycleRequestDto rejectRequest(int requestId, String reason) {
		RecycleRequest request = recycleRequestRepository.findById(requestId).orElseThrow(()->new NotFoundException("Request not found"));
		request.setRequestStatus(RequestStatus.REJECTED);
		request.setReason(reason);
RecycleRequest	saved	=recycleRequestRepository.save(request);
		return   modelMapper.map(saved,RecycleRequestDto.class);
	}


	@Override
	public RecycleRequestDto approvedRequest(int requestId) {
		RecycleRequest request = recycleRequestRepository.findById(requestId).orElseThrow(()->new NotFoundException("Request not found"));
		request.setRequestStatus(RequestStatus.APPROVED);
	
RecycleRequest	saved	=recycleRequestRepository.save(request);
		return modelMapper.map(saved, RecycleRequestDto.class);
	}


	@Override
	public String setRequestImage(String image, int id) {
		RecycleRequest request = recycleRequestRepository.findById(id).orElseThrow(()->new NotFoundException("Request not found"));
		request.setItemImage(image);
		RecycleRequest saved = recycleRequestRepository.save(request);
		return saved.getItemImage();
	}

}
