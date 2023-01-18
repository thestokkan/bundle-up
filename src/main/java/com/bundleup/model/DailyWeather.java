package com.bundleup.model;

import java.util.List;

public record DailyWeather(
        String date,
        int weatherCode,
        List<String> time,
        List<Double> temperature,
        List<Double> apparentTemperature,
        List<Double> precipitation,
        List<Double> windSpeed,
        Double minTemp,
        Double maxTemp,
        Double precipitationSum
) {}