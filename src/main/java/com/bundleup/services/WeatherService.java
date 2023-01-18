package com.bundleup.services;

import com.bundleup.model.APImodels.HourlyWeatherAPI;
import com.bundleup.model.APImodels.WeatherDataAPI;
import com.bundleup.model.DailyWeather;
import com.bundleup.model.Location;
import com.bundleup.model.WeatherData;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Comparator;
import java.util.List;

@Service
public class WeatherService {
  RestTemplate restTemplate;
  private WeatherDataAPI data;
  private HourlyWeatherAPI hourlyData;

  public WeatherService(RestTemplate restTemplate) {
    this.restTemplate = restTemplate;
  }

  public WeatherData getWeatherDataForLocation(Float latitude,
                                               Float longitude,
                                               String timezone) {

    LocalDate today = LocalDate.now();
    String tomorrow = (today.plusDays(1)).format(DateTimeFormatter.ISO_DATE);

    data = restTemplate.getForObject(
            "https://api.open-meteo.com/v1/forecast?latitude=" + latitude + "&longitude=" +
            longitude + "&hourly=temperature_2m,apparent_temperature,precipitation," +
            "windspeed_10m&daily=weathercode&windspeed_unit=ms&timezone=" + timezone +
            "&start_date=" + today + "&end_date=" + tomorrow, WeatherDataAPI.class);

    assert data != null;
    hourlyData = data.hourly();

    return new WeatherData(new Location(latitude, longitude), getDailyWeatherData(0),
                           getDailyWeatherData(1), data.hourlyUnitsAPI());
  }

  /**
   * dayIndex 0 = today, dayIndex 1 = tomorrow
   **/
  public DailyWeather getDailyWeatherData(int dayIndex) {
    int startIndex = 8;
    int endIndex = 18;

    if (dayIndex == 1) {
      startIndex = 32;
      endIndex = 42;
    }

    String date = data.daily().time().get(dayIndex);
    int weatherCode = data.daily().weathercode().get(dayIndex);
    List<String> time = hourlyData.time().subList(startIndex, endIndex);
    List<Double> temperature = hourlyData.temperature().subList(startIndex, endIndex);
    List<Double> apparentTemperature =
            hourlyData.apparentTemperature().subList(startIndex, endIndex);
    List<Double> precipitation = hourlyData.precipitation().subList(startIndex, endIndex);
    List<Double> windSpeed = hourlyData.windSpeed().subList(startIndex, endIndex);
    Double maxTemp = getMax(apparentTemperature);
    Double minTemp = getMin(apparentTemperature);
    Double precipitationSum = getDoubleSum(precipitation);

    return new DailyWeather(date, weatherCode, time, temperature, apparentTemperature,
                            precipitation, windSpeed, maxTemp, minTemp, precipitationSum);
  }

  // Helper methods
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