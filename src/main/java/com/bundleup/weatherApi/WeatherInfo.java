package com.bundleup.weatherApi;

public record WeatherInfo(
        Double latitude,
        Double longitude,
        String dateToday,
        String dateTomorrow,
        int weatherCodeToday,
        int weatherCodeTomorrow
) {}