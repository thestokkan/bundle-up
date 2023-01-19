package com.bundleup.model;

import java.util.List;

public record DailyWeatherDetail(
        List<String> time,
        List<Double> temperature,
        List<Double> apparentTemperature,
        List<Double> precipitation,
        List<Double> windSpeed
) {}