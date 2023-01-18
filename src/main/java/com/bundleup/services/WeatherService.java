package com.bundleup.services;

import com.bundleup.model.DailyWeather;
import com.bundleup.model.Location;
import com.bundleup.model.WeatherData;
import com.bundleup.model.weatherApi.HourlyWeatherAPI;
import com.bundleup.model.weatherApi.WeatherDataAPI;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Comparator;
import java.util.List;

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
  private WeatherDataAPI data;

  public WeatherService(RestTemplate restTemplate) {
    this.restTemplate = restTemplate;
  }

  // Data from API
  public WeatherDataAPI getWeatherDataFromAPI() {
    if (data == null) {
      data = restTemplate.getForObject(WEATHER_API_URL, WeatherDataAPI.class);
    }
    return data;
  }

  public HourlyWeatherAPI getHourlyWeatherFromAPI() {
    return getWeatherDataFromAPI().hourly();
  }

  // Service methods
  public WeatherData getWeatherData() {
    Location location =
            new Location(getWeatherDataFromAPI().latitude(), getWeatherDataFromAPI().longitude());

    return new WeatherData(location, getDailyWeatherData(0), getDailyWeatherData(1),
                           getWeatherDataFromAPI().hourlyUnitsAPI());
  }

  /** dayIndex 0 = today, dayIndex 1 = tomorrow **/
  public DailyWeather getDailyWeatherData(int dayIndex) {
    int startIndex = 8;
    int endIndex = 18;

    if (dayIndex == 1) {
      startIndex = 32;
      endIndex = 42;
    }

    String date = getWeatherDataFromAPI().daily().time().get(dayIndex);
    int weatherCode =getWeatherDataFromAPI().daily().weathercode().get(dayIndex);
    List<String> time = getHourlyWeatherFromAPI().time().subList(startIndex, endIndex);
    List<Double> temperature = getHourlyWeatherFromAPI().temperature().subList(startIndex, endIndex);
    List<Double> apparentTemperature =
            getHourlyWeatherFromAPI().apparentTemperature().subList(startIndex, endIndex);
    List<Double> precipitation = getHourlyWeatherFromAPI().precipitation().subList(startIndex, endIndex);
    List<Double> windSpeed = getHourlyWeatherFromAPI().windSpeed().subList(startIndex, endIndex);
    Double maxTemp = getMax(apparentTemperature);
    Double minTemp = getMin(apparentTemperature);
    Double precipitationSum = getDoubleSum(precipitation);

    return new DailyWeather(date, weatherCode, time, temperature, apparentTemperature,
                            precipitation, windSpeed, maxTemp, minTemp, precipitationSum);
  }

  // Utility methods
  private Double getMax(List<Double> list) {
    return list.stream().max(comparator()).get();
  }

  private Double getMin(List<Double> list) {
    return list.stream().min(comparator()).get();
  }

  private Double getDoubleSum(List<Double> list) {
    return list.stream().mapToDouble(Double::doubleValue).sum();
  }

  private Comparator<Double> comparator() {
    return (n1, n2) -> {
      if (n1 < 0 && n2 < 0) {
        return n2.compareTo(n1);
      } else {
        return n1.compareTo(n2);
      }
    };
  }

}