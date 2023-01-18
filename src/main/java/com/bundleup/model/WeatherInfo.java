package com.bundleup.model;

public record WeatherInfo(
        Double latitude,
        Double longitude,
        String dateToday,
        String dateTomorrow,
        int weatherCodeToday,
        int weatherCodeTomorrow
) {}