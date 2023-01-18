package com.bundleup.model.weatherApi;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public record WeatherData(
        Double latitude,
        Double longitude,
        @JsonProperty("hourly_units")
        HourlyUnits hourlyUnits,
        @JsonProperty("hourly")
        HourlyWeather hourly,
        @JsonProperty("daily") DailyWeather daily) {}