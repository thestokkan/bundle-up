package com.bundleup.controllers;

import com.bundleup.services.WeatherService;
import com.bundleup.model.WeatherData;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WeatherController {
  private final WeatherService weatherService;

  public WeatherController(WeatherService weatherService) {
    this.weatherService = weatherService;
  }

  @GetMapping("/weather")
  public WeatherData getWeatherDataForLocation(@RequestParam("latitude") Float latitude,
                                               @RequestParam("longitude") Float longitude) {
    System.out.println("REQUEST PARAMS:");
    System.out.println(latitude);
    System.out.println(longitude);
    return weatherService.getWeatherDataForLocation(latitude, longitude);
  }

}