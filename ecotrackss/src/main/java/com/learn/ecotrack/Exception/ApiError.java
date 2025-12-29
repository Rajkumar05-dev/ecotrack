package com.learn.ecotrack.Exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
//we tell how to handle exception
public class ApiError {
   
	private String path;
	private String error;
	private String errorMessage;
	
	
}
