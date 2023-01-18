package com.bundleup.model.APImodels;

import com.fasterxml.jackson.annotation.JsonProperty;

public record HourlyUnitsAPI(String time, @JsonProperty("temperature_2m") String temperature,
                             String precipitation, @JsonProperty("windspeed_10m") String windspeed) {}