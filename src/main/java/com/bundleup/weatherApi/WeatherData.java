package com.bundleup.weatherApi;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record WeatherData(Double latitude,
                          Double longitude,
                          DailyUnits daily_units,
                          DailyWeather daily) {}