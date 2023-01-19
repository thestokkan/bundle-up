package com.bundleup.model;

import com.bundleup.model.APImodels.HourlyUnitsAPI;

public record WeatherData(
        DailyWeather today,
        DailyWeather tomorrow,
        HourlyUnitsAPI units
) {}