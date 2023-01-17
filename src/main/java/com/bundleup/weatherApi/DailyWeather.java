package com.bundleup.weatherApi;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public record DailyWeather(List<String> time,
                           List<Integer> weathercode,
                           List<Double> temperature_2m_max,
                           List<Double> temperature_2m_min,
                           List<Double> apparent_temperature_max,
                           List<Double> apparent_temperature_min,
                           List<Double> precipitation_sum,
                           List<Double> windspeed_10m_max) {}