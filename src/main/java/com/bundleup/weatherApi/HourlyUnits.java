package com.bundleup.weatherApi;

import com.fasterxml.jackson.annotation.JsonProperty;

public record HourlyUnits(String time, @JsonProperty("temperature_2m") String temperature,
                          @JsonProperty("apparent_temperature") String apparentTemperature,
                          String precipitation, @JsonProperty("windspeed_10m") String windspeed) {}