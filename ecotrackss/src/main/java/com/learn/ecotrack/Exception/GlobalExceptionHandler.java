package com.learn.ecotrack.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import jakarta.servlet.http.HttpServletRequest;

@RestControllerAdvice// use for global exception handler
public class GlobalExceptionHandler {
 
	
	@ExceptionHandler(exception = NotFoundException.class)
	public ResponseEntity<ApiError> notFoundExecptionHandler(NotFoundException ex,HttpServletRequest request){
		
		ApiError apiError = new ApiError();
		apiError.setError(ex.getClass().getSimpleName());
		apiError.setErrorMessage(ex.getMessage());
		apiError.setPath(request.getRequestURI());
		return new ResponseEntity<ApiError>(apiError,HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
}
