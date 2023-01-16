package com.bundleup.weatherApi;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record WeatherData(double latitude,
                          double longitude,
                          DailyUnits daily_units,
                          Daily daily) {

}