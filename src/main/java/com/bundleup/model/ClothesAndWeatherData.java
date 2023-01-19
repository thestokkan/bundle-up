package com.bundleup.model;

public record ClothesAndWeatherData(
    BasicWeatherData basicWeatherData,
    ClothesCombo clothesCombo
) {}