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
import java.util.stream.Collectors;

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

    return new WeatherData(getDailyWeatherData(0),
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
    List<String> time = hourlyData.time();
    List<Double> temperature = hourlyData.temperature();
    List<Double> apparentTemperature = hourlyData.apparentTemperature();
    List<Double> precipitation = hourlyData.precipitation();
    List<Double> windSpeed = hourlyData.windSpeed();

    // Between 8am and 5pm
    Double maxTempDay = getMax(temperature.subList(startIndex, endIndex));
    Double minTempDay = getMin(temperature.subList(startIndex, endIndex));
    Double maxApparentTempDay = getMax(apparentTemperature.subList(startIndex, endIndex));
    Double minApparentTempDay = getMin(apparentTemperature.subList(startIndex, endIndex));
    Double precipitationSumDay = getDoubleSum(precipitation.subList(startIndex, endIndex));
    Double maxWindSpeedDay = getMax(windSpeed.subList(startIndex, endIndex));

    return new DailyWeather(date, weatherCode, maxTempDay, minTempDay, maxApparentTempDay,
                            minApparentTempDay, precipitationSumDay, maxWindSpeedDay, time,
                            temperature, apparentTemperature, precipitation, windSpeed);
  }

  // Helper methods
  private Double getMax(List<Double> list) {
    return list.stream().max(Comparator.reverseOrder()).get();
  }

  private Double getMin(List<Double> list) {
    return list.stream().min(Comparator.reverseOrder()).get();
  }

  private Double getDoubleSum(List<Double> list) {
    return list.stream().mapToDouble(Double::doubleValue).sum();
  }

}