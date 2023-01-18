package com.bundleup.controllers;

import com.bundleup.model.DailyWeather;
import com.bundleup.services.WeatherService;
import com.bundleup.model.WeatherInfo;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WeatherController {
  private final WeatherService weatherService;

  public WeatherController(WeatherService weatherService) {
    this.weatherService = weatherService;
  }

  @GetMapping("/weather")
  public WeatherInfo weatherData() {
    return weatherService.getWeatherInfo();
  }

  @GetMapping("/today")
  public DailyWeather daytime() {
    return weatherService.getDailyWeather(1);
  }

  @GetMapping("/tomorrow")
  public DailyWeather tomorrow() {
    return weatherService.getDailyWeather(2);
  }

}