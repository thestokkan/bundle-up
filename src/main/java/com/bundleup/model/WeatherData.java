package com.bundleup.model;

import com.bundleup.model.weatherApi.HourlyUnitsAPI;

public record WeatherData(
        Location location,
        DailyWeather today,
        DailyWeather tomorrow,
        HourlyUnitsAPI units
) {}