package com.bundleup.controllers;

import com.bundleup.model.ClothesAndWeatherData;
import com.bundleup.model.ClothesCombo;
import com.bundleup.model.WeatherData;
import com.bundleup.services.ClothesService;
import com.bundleup.services.WeatherService;
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

  @GetMapping("/detailedweather")
  public WeatherData getWeatherDataForLocation(@RequestParam("latitude") Float latitude,
                                               @RequestParam("longitude") Float longitude,
                                               @RequestParam("timezone") String timezone) {

    return weatherService.getWeatherDataForLocation(latitude, longitude, timezone, "detailed");
  }

  @GetMapping("/weatherandcombo")
  public ClothesAndWeatherData getWeatherAndComboForLocation(@RequestParam("latitude") Float latitude,
                                                   @RequestParam("longitude") Float longitude,
                                                   @RequestParam("timezone") String timezone) {

    WeatherData weatherData =
            weatherService.getWeatherDataForLocation(latitude, longitude, timezone, "basic");
    ClothesCombo combo = clothesService.getClothesCombo(weatherData);

    return new ClothesAndWeatherData(weatherData, combo);
  }

}