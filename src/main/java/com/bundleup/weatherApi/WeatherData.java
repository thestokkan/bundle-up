package com.bundleup.weatherApi;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public record WeatherData(Double latitude,
                          Double longitude,
                          @JsonProperty("daily_units")
                          DailyUnits dailyUnits,
                          DailyWeatherHourly dailyWeatherHourly) {}