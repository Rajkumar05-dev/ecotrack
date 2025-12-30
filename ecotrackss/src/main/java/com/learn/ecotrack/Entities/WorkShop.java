package com.learn.ecotrack.Entities;


import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class WorkShop {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	private String name;
	private String description;
	private Integer price;
	private String image;
	private LocalDate registrationDate;
	private LocalDateTime time;
	private int duration;
	private String venue;
	@OneToMany(mappedBy = "workShop")
	@JsonBackReference
	private List<Enrollments> enrollment=new ArrayList<Enrollments>();
	
	
	
	
}
