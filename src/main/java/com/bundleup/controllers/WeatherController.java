package com.bundleup.controllers;

import com.bundleup.model.BasicWeatherData;
import com.bundleup.model.ClothesAndWeatherData;
import com.bundleup.model.ClothesCombo;
import com.bundleup.services.ClothesService;
import com.bundleup.services.WeatherService;
import com.bundleup.model.WeatherData;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class WeatherController {
  private final WeatherService weatherService;
  private final ClothesService clothesService;

  public WeatherController(WeatherService weatherService,
                           ClothesService clothesService) {
    this.weatherService = weatherService;
    this.clothesService = clothesService;
  }

  @GetMapping("/weather")
  public WeatherData getWeatherDataForLocation(@RequestParam("latitude") Float latitude,
                                               @RequestParam("longitude") Float longitude,
                                               @RequestParam("timezone") String timezone) {
    return weatherService.getWeatherDataForLocation(latitude, longitude, timezone);
  }

//  @GetMapping("/weatherandcombo")
//  public WeatherData getWeatherAndComboForLocation(@RequestParam("latitude") Float latitude,
//                                               @RequestParam("longitude") Float longitude,
//                                               @RequestParam("timezone") String timezone) {
//
//    WeatherData data = weatherService.getWeatherDataForLocation(latitude, longitude, timezone);
//    ClothesCombo combo = clothesService.getClothesCombo(data);
//
//    return new ClothesAndWeatherData(data, combo);
//  }

}