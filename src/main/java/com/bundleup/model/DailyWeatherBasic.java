package com.bundleup.model;

public record DailyWeatherBasic(
        String date,
        int weatherCode,
        Double minTempDay,
        Double maxTempDay,
        Double minApparentTempDay,
        Double maxApparentTempDay,
        Double precipitationSumDay,
        Double maxWindSpeedDay
) {}