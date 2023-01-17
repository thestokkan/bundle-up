package com.bundleup.services;

import com.bundleup.weatherApi.WeatherData;
import com.bundleup.weatherApi.WeatherDataHourly;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Service
public class WeatherService {
  LocalDate today = LocalDate.now();
  String tomorrow = (today.plusDays(1)).format(DateTimeFormatter.ISO_DATE);

  private final String DAILY_WEATHER_API_URL =
          "https://api.open-meteo.com/v1/forecast?latitude=59" +
          ".91&longitude=10.75&dailyWeather=weathercode," +
          "temperature_2m_max,temperature_2m_min," +
          "apparent_temperature_max,apparent_temperature_min," +
          "precipitation_sum,windspeed_10m_max&windspeed_unit=ms" +
          "&timezone=Europe/Berlin&start_date=" + today + "&end_date" + "=" + tomorrow;

  private final String HOURLY_WEATHER_API_URL =
          "https://api.open-meteo.com/v1/forecast?latitude=59" +
          ".91&longitude=10.75&hourly=temperature_2m,apparent_temperature,precipitation," +
          "windspeed_10m&dailyWeather=weathercode&windspeed_unit=ms&timezone=Europe/Berlin" +
          "&start_date=" + today + "&end_date" + "=" + tomorrow;

  RestTemplate restTemplate;
  private WeatherData dailyData;
  private WeatherDataHourly hourlyData;

  public WeatherService(RestTemplate restTemplate) {
    this.restTemplate = restTemplate;
  }

  public WeatherData getWeatherData() {
    if (dailyData == null) {
      dailyData = restTemplate.getForObject(DAILY_WEATHER_API_URL, WeatherData.class);
    }
    return dailyData;
  }

  public WeatherDataHourly getHourlyWeatherData() {
    if (hourlyData == null) {
      hourlyData = restTemplate.getForObject(HOURLY_WEATHER_API_URL, WeatherDataHourly.class);
    }
    return hourlyData;
  }

}