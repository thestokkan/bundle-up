package com.bundleup.controllers;

import com.bundleup.model.DailyWeather;
import com.bundleup.services.WeatherService;
import com.bundleup.model.WeatherData;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

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

  @GetMapping("/today")
  public DailyWeather daytime() {
    return weatherService.getDailyWeatherData(1);
  }

  @GetMapping("/tomorrow")
  public DailyWeather tomorrow() {
    return weatherService.getDailyWeatherData(2);
  }

}