package com.bundleup.model;

public record BasicWeatherData(
    DailyWeatherBasic dailyWeatherBasic,
    DailyWeatherDetail dailyWeatherDetail
) {}