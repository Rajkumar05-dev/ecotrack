package com.learn.ecotrack.Controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.learn.ecotrack.Dtos.RecycleRequestDto;
import com.learn.ecotrack.Services.FileService;
import com.learn.ecotrack.Services.RecycleRequestService;

@RestController
@RequestMapping("/request")
public class RecycleRequestController {
@Autowired
	private RecycleRequestService recycleRequestService;
@Autowired
private FileService fileService;
@Value("{request.images}")
private String image;
	
@PostMapping("/{userId}")
	public ResponseEntity<RecycleRequestDto> addRequest( @PathVariable String userId, @RequestBody RecycleRequestDto recycleRequestDto){
		
		return new ResponseEntity<RecycleRequestDto>(recycleRequestService.addRequest(recycleRequestDto, userId),HttpStatus.CREATED);
		
	}
@PutMapping("/reject/{id}")
public ResponseEntity<RecycleRequestDto> rejectRequest(@PathVariable int id,@RequestParam String reason){
	return new ResponseEntity<RecycleRequestDto>(recycleRequestService.rejectRequest(id, reason),HttpStatus.OK);
}

@PutMapping("/approve/{id}")
public ResponseEntity< RecycleRequestDto> approvedRequest(@PathVariable int id){
	return new ResponseEntity<RecycleRequestDto>(recycleRequestService.approvedRequest(id),HttpStatus.OK);
}

@PostMapping("upload-image/{id}") 
public ResponseEntity<Map<String,String>> uploadImage(@PathVariable int id, @RequestParam("requestImage")MultipartFile file) throws IOException{
	String imageName = fileService.uploadfile(file, image);
	String imageUploaded = recycleRequestService.setRequestImage(imageName, id);
	Map<String,String>  response=new HashMap<String, String>();
	response.put("imageName", imageUploaded);
	response.put("Message","Image upload successfully");
	return new ResponseEntity<Map<String,String>>(response,HttpStatus.OK);
	
}
}
