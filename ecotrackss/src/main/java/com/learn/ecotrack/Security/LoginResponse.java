package com.learn.ecotrack.Security;

import com.learn.ecotrack.Dtos.UserDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponse {
	private String token;
	private UserDto userDto;
}
