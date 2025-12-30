package com.learn.ecotrack.Entities;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Enrollments {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id ;
	@ManyToOne
	@JsonManagedReference
	private User user;
	@ManyToOne
	@JsonManagedReference 
	private WorkShop workShop;
	@CreationTimestamp
	private LocalDateTime enrolledAt;
	
}
