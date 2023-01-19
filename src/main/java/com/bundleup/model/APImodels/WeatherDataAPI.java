package com.bundleup.model.APImodels;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public record WeatherDataAPI(
        @JsonProperty("hourly_units") HourlyUnitsAPI hourlyUnitsAPI,
        @JsonProperty("hourly") HourlyWeatherAPI hourly,
        @JsonProperty("daily") DailyWeatherAPI daily) {}