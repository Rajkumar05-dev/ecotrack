package com.learn.ecotrack.Dtos;

import com.learn.ecotrack.Entities.User;
import com.learn.ecotrack.Enum.RequestStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RecycleRequestDto {
	private int id;
	private String itemType;
	private String itemImage;
	private int quantity;

	private User user;
	
	private RequestStatus requestStatus ;
}
