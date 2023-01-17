package com.bundleup.weatherApi;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public record HourlyWeather(
        List<String> time,
        @JsonProperty("temperature_2m") List<Double> temperature,
        @JsonProperty("apparent_temperature") List<Double> apparentTemperature,
        List<Double> precipitation,
        @JsonProperty("windspeed_10m") List<Double> windspeed) {}