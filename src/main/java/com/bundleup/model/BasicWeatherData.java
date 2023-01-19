package com.bundleup.model;

public record BasicWeatherData(
    DailyWeatherBasic today,
    DailyWeatherBasic tomorrow
) {}