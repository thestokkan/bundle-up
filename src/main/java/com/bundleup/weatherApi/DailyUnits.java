package com.bundleup.weatherApi;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record DailyUnits(String temperature_2m_max,
                         String temperature_2m_min,
                         String apparent_temperature_max,
                         String apparent_temperature_min,
                         String rain_sum,
                         String snowfall_sum,
                         String windspeed_10m_max) {

}