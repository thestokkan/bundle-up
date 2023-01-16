package com.bundleup.controllers;

import com.bundleup.weatherApi.WeatherData;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class WeatherController {
  RestTemplate restTemplate;
  ObjectMapper mapper;
  private final String WEATHER_API_URL = "https://api.open-meteo.com/v1/forecast?latitude=59.91&longitude=10" +
                                         ".75&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max," +
                                         "apparent_temperature_min,rain_sum,snowfall_sum," +
                                         "windspeed_10m_max&windspeed_unit=ms&timezone=Europe%2FBerlin";


  public WeatherController(RestTemplate restTemplate,
                           ObjectMapper mapper) {
    this.restTemplate = restTemplate;
    this.mapper = mapper;
  }

  public WeatherData fetchWeatherData() {
    return restTemplate.getForObject(WEATHER_API_URL, WeatherData.class);
  }

  @GetMapping("/weather")
  public String weatherData() throws JsonProcessingException {
    return mapper.writeValueAsString(fetchWeatherData());
  }

  @GetMapping("/hello")
  public String hello() {
    System.out.println(fetchWeatherData());
    return "Hello";
  }

}