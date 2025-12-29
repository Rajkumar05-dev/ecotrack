package com.learn.ecotrack.Services;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

import org.springframework.web.multipart.MultipartFile;

public interface FileService {

	
	String uploadfile(MultipartFile multipartFile , String path) throws IOException;
	InputStream getResource(String path,String name) throws FileNotFoundException;
	
}
