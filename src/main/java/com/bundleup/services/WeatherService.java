package com.bundleup.services;

import com.bundleup.weatherApi.HourlyWeather;
import com.bundleup.weatherApi.WeatherData;
import com.bundleup.weatherApi.WeatherInfo;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Service
public class WeatherService {
  LocalDate today = LocalDate.now();
  String tomorrow = (today.plusDays(1)).format(DateTimeFormatter.ISO_DATE);

  private final String WEATHER_API_URL = "https://api.open-meteo.com/v1/forecast?latitude=59" +
                                         ".91&longitude=10.75&hourly=temperature_2m," +
                                         "apparent_temperature,precipitation," +
                                         "windspeed_10m&daily=weathercode&windspeed_unit=ms" +
                                         "&timezone=Europe/Berlin" + "&start_date=" + today +
                                         "&end_date" + "=" + tomorrow;

  RestTemplate restTemplate;
  private WeatherData data;

  public WeatherService(RestTemplate restTemplate) {
    this.restTemplate = restTemplate;
  }

  public WeatherData getWeatherData() {
    if (data == null) {
      data = restTemplate.getForObject(WEATHER_API_URL, WeatherData.class);
    }
    return data;
  }

  public HourlyWeather getHourlyWeather() {
    return getWeatherData().hourly();
  }

  // Weather data between 8am and 5pm
  // Indices today: 8 - 17
  // Indices tomorrow: 32 - 41
  public HourlyWeather getDaytimeWeather(int day) {
    int startIndex = 8;
    int endIndex = 18;

    if (day == 2) {
      startIndex = 32;
      endIndex = 42;
    }

    return new HourlyWeather(
            getHourlyWeather().time().subList(startIndex,endIndex),
            getHourlyWeather().temperature().subList(startIndex,endIndex),
            getHourlyWeather().apparentTemperature().subList(startIndex,endIndex),
            getHourlyWeather().precipitation().subList(startIndex,endIndex),
            getHourlyWeather().windSpeed().subList(startIndex,endIndex)
    );
  }

  public WeatherInfo getWeatherInfo() {
    return new WeatherInfo(data.latitude(),
                           data.longitude(),
                           data.daily().time().get(0),
                           data.daily().time().get(1),
                           data.daily().weathercode().get(0),
                           data.daily().weathercode().get(1)
    );
  }


}