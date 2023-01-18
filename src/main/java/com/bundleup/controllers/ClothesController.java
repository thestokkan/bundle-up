package com.bundleup.controllers;

import com.bundleup.model.database.Clothes;
import com.bundleup.services.ClothesService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController

public class ClothesController {

    private ClothesService clothesService;

    public ClothesController(ClothesService clothesService) {
        this.clothesService = clothesService;
    }

    @GetMapping("/clothes")
    public List<Clothes> getClothes(@RequestParam(defaultValue = "0",required = false) int day){

        return clothesService.weatherTooClothes(day);

    }
}
