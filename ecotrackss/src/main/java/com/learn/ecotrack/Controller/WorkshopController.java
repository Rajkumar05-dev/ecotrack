package com.learn.ecotrack.Controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.service.annotation.GetExchange;

import com.learn.ecotrack.Dtos.WorkShopDto;
import com.learn.ecotrack.Services.WorkShopService;

@RestController
@RequestMapping("/workshops")
public class WorkshopController {

	@Autowired
	private WorkShopService workShopService; 
	@PostMapping
	 public ResponseEntity<WorkShopDto> createWorkShop(@RequestBody WorkShopDto  workShopDto){
		  return new ResponseEntity<WorkShopDto>(workShopService.addWorkShop(workShopDto),HttpStatus.CREATED);
	 }
	@GetMapping
	public ResponseEntity<List<WorkShopDto>> getAllWorkShop(){
		return new ResponseEntity<List<WorkShopDto>>(workShopService.getAllWorkShops(),HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<WorkShopDto> getWorkShop(@PathVariable int id ){
		return new ResponseEntity<WorkShopDto>(workShopService.getWorkShop(id),HttpStatus.OK);
	}
	@DeleteMapping("/{id}")
	public ResponseEntity<Map<String , String>> deletWorkShopById(@PathVariable Integer id ){
		workShopService.deletWorkSho(id);
		HashMap<String , String> map= new HashMap<String, String>();
		map.put("Message",id+"-workshop deleted" );
		return ResponseEntity.ok(map);
	}
	
	@PutMapping("/{id}")
	 public ResponseEntity<WorkShopDto> createWorkShop(@RequestBody WorkShopDto  workShopDto,@PathVariable int id){
		  return  ResponseEntity.ok(workShopService.UpdateWorkShop(id, workShopDto));
	 }
}
