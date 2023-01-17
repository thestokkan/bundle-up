package com.bundleup.weatherApi;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public record DailyWeather(List<String> time,
                           List<Integer> weathercode) {}