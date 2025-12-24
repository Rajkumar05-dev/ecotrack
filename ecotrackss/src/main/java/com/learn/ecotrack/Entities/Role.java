package com.learn.ecotrack.Entities;

import java.util.List;

import com.learn.ecotrack.Enum.AppRole;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Role {

	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int roleId;
	@Enumerated(EnumType.STRING)
	private AppRole appRole;
	
	@OneToMany(mappedBy = "role")
	 private List<User> users;
}
