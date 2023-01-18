package com.bundleup.controllers;

import com.bundleup.model.database.Weather;
import com.bundleup.services.WeatherService;
import com.bundleup.model.weatherApi.DailyWeather;
import com.bundleup.model.weatherApi.HourlyWeather;
import com.bundleup.model.weatherApi.WeatherData;
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
  public WeatherData weatherData() {
    return weatherService.getWeatherData();
  }

  @GetMapping("/daily")
  public DailyWeather daily() {
   return weatherService.getWeatherData().daily();
  }

  @GetMapping("/hourly")
  public HourlyWeather hourly() {
    return weatherService.getWeatherData().hourly();
  }

  @GetMapping("/today")
  public HourlyWeather daytime1() {
    return weatherService.getDaytimeWeather(1);
  }

  @GetMapping("/tomorrow")
  public HourlyWeather tomorrow() {
    return weatherService.getDaytimeWeather(2);
  }

  @GetMapping("/info")
  public WeatherInfo info() {
    return weatherService.getWeatherInfo();
  }

  @GetMapping("/dbweather")
  public Weather db() {
    return weatherService.getWeatherForDatabase(1);
  }
}