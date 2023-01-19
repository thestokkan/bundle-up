package com.bundleup.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
public class WeatherDataBasic implements WeatherData {
  DailyWeatherBasic today;
  DailyWeatherBasic tomorrow;
}