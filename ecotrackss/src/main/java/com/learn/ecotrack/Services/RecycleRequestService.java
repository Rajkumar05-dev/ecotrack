package com.learn.ecotrack.Services;

import com.learn.ecotrack.Dtos.RecycleRequestDto;

public interface RecycleRequestService {

	
	RecycleRequestDto addRequest(RecycleRequestDto recycleRequestDto , String userId);
}
