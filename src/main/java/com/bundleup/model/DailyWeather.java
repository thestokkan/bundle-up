package com.bundleup.model;

import java.util.List;

public record DailyWeather(
        String date,
        int weatherCode,
        Double minTempDay,
        Double maxTempDay,
        Double minApparentTempDay,
        Double maxApparentTempDay,
        Double precipitationSumDay,
        Double maxWindSpeedDay,
        List<String> time,
        List<Double> temperature,
        List<Double> apparentTemperature,
        List<Double> precipitation,
        List<Double> windSpeed
) {}