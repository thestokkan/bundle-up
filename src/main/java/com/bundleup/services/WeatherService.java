package com.bundleup.services;

import com.bundleup.weatherApi.WeatherData;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Calendar;
import java.util.Date;

@Service
public class WeatherService {
  SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
  private String today = simpleDateFormat.format(new Date());

  private final String WEATHER_API_URL = "https://api.open-meteo.com/v1/forecast?latitude=59" +
                                         ".91&longitude=10.75&daily=weathercode," +
                                         "temperature_2m_max,temperature_2m_min," +
                                         "apparent_temperature_max,apparent_temperature_min," +
                                         "precipitation_sum,windspeed_10m_max&windspeed_unit=ms" +
                                         "&timezone=Europe/Berlin&start_date=2023-01-17&end_date" +
                                         "=2023-01-18";
  RestTemplate restTemplate;
  private WeatherData data;

  public WeatherService(RestTemplate restTemplate) {
    this.restTemplate = restTemplate;
  }

  public WeatherData getWeatherData() {
    if (data == null) {
      data = restTemplate.getForObject(WEATHER_API_URL, WeatherData.class);
    }
    System.out.println("TODAY'S DATE: " + today);
    return data;
  }

}