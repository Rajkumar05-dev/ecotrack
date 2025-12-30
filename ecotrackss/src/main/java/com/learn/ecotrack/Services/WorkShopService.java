package com.learn.ecotrack.Services;



import java.util.List;

import com.learn.ecotrack.Dtos.WorkShopDto;

public interface WorkShopService {
 WorkShopDto addWorkShop(WorkShopDto workShopDto );
 WorkShopDto   UpdateWorkShop(int id ,WorkShopDto workShopDto);
 WorkShopDto getWorkShop(int id);
 List<WorkShopDto> getAllWorkShops();

 void deletWorkSho(int id);
 
}
