package com.bundleup.model;

public record ClothesAndWeatherData(
    WeatherData weatherDataBasic,
    ClothesCombo clothesCombo
) {}