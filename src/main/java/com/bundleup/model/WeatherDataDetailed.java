package com.bundleup.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
public class WeatherDataDetailed implements WeatherData {
  DailyWeatherDetail today;
  DailyWeatherDetail tomorrow;
}