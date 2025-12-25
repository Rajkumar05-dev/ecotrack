package com.learn.ecotrack.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.learn.ecotrack.Dtos.RecycleRequestDto;
import com.learn.ecotrack.Services.RecycleRequestService;

@RestController
@RequestMapping("/request")
public class RecycleRequestController {
@Autowired
	private RecycleRequestService recycleRequestService;
	
@PostMapping("/{userId}")
	public ResponseEntity<RecycleRequestDto> addRequest( @PathVariable String userId, @RequestBody RecycleRequestDto recycleRequestDto){
		
		return new ResponseEntity<RecycleRequestDto>(recycleRequestService.addRequest(recycleRequestDto, userId),HttpStatus.CREATED);
		
	}
}
