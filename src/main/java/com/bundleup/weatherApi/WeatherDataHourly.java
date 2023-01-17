package com.bundleup.weatherApi;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public record WeatherDataHourly(
        Double latitude,
        Double longitude,
        @JsonProperty("hourly_units")
        HourlyUnits hourlyUnits,
        @JsonProperty("hourly")
        Hourly hourly,
        @JsonProperty("daily_units")
        DailyUnits dailyUnits,
        @JsonProperty("daily") DailyWeatherHourly dailyWeather) {}