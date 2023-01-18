package com.bundleup.model.APImodels;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public record DailyWeatherAPI(List<String> time,
                              List<Integer> weathercode) {}