package com.learn.ecotrack.Services.impl;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.learn.ecotrack.Dtos.WorkShopDto;
import com.learn.ecotrack.EcotrackssApplication;
import com.learn.ecotrack.Entities.WorkShop;
import com.learn.ecotrack.Exception.NotFoundException;
import com.learn.ecotrack.Repository.WorkShopRespository;
import com.learn.ecotrack.Services.WorkShopService;

@Service
public class WorkShopServiceImpl implements WorkShopService {



	@Autowired
	private WorkShopRespository workShopRespository;
	@Autowired
	private ModelMapper modelMapper;

  
	
	@Override
	public WorkShopDto addWorkShop(WorkShopDto workShopDto) {
		WorkShop saved = workShopRespository.save(modelMapper.map(workShopDto, WorkShop.class ));
		return  modelMapper.map(saved,WorkShopDto.class);
	}

	@Override
	public WorkShopDto UpdateWorkShop(int id, WorkShopDto workShopDto) {
	 workShopRespository.findById(id).orElseThrow(()->new NotFoundException("Workshop not found"));
	 WorkShop workShop = modelMapper.map(workShopDto,WorkShop.class);
	 workShop.setId(id);
	  WorkShop savedWorkshop = workShopRespository.save(workShop);
		return modelMapper.map(savedWorkshop, WorkShopDto.class);
	}

	@Override
	public WorkShopDto getWorkShop(int id) {
		
		WorkShop workshop = workShopRespository.findById(id).orElseThrow(()->new NotFoundException("Workshop not found"));
		return modelMapper.map(workshop, WorkShopDto.class);
	}

	@Override
	public List<WorkShopDto> getAllWorkShops() {
		List<WorkShopDto> list = workShopRespository.findAll().stream().map(w->modelMapper.map(w,WorkShopDto.class)).toList();
		
		return list;
	}

	@Override
	public void deletWorkSho(int id ) {
		// TODO Auto-generated method stub
		WorkShop workshop = workShopRespository.findById(id).orElseThrow(()->new NotFoundException("Workshop not found"));
		 workShopRespository.delete(workshop);
	}

	

}
