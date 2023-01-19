package com.bundleup.controllers;

import com.bundleup.model.ClothesCombo;
import com.bundleup.model.database.Clothes;
import com.bundleup.services.ClothesService;
import com.bundleup.services.WeatherService;
import com.bundleup.model.WeatherData;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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
    WeatherData data = weatherService.getWeatherDataForLocation(latitude, longitude, timezone);

    ClothesCombo combo = clothesService.getClothesCombo(data);

    return null;
  }

//  @GetMapping("/basicWeather")
//  public WeatherData getWeatherDataForLocation(@RequestParam("latitude") Float latitude,
//                                               @RequestParam("longitude") Float longitude,
//                                               @RequestParam("timezone") String timezone) {
//    return weatherService.getWeatherDataForLocation(latitude, longitude, timezone);
//  }


}