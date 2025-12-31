package com.learn.ecotrack.Security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.learn.ecotrack.Entities.User;
import com.learn.ecotrack.Repository.UserRespository;

@Component

public class UserDetailServiceImpl implements UserDetailsService  {
 @Autowired
	 private UserRespository userRespository;
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRespository.findByEmail(username).orElseThrow(()-> new RuntimeException("Email not found"));
		return user;
	}

}
