package com.bundleup.controllers;

import com.bundleup.services.WeatherService;
import com.bundleup.weatherApi.DailyWeather;
import com.bundleup.weatherApi.WeatherData;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class WeatherController {
  private final WeatherService weatherService;

  public WeatherController(WeatherService weatherService) {
    this.weatherService = weatherService;
  }

  @GetMapping("/weather")
  public WeatherData weatherData() {
    return weatherService.getWeatherData();
  }

  @GetMapping("/daily")
  public DailyWeather daily() {
   return weatherService.getWeatherData().daily();
  }

}