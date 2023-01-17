package com.bundleup.weatherApi;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public record DailyUnits(@JsonProperty("temperature_2m_max") String tempMax,
                         @JsonProperty("temperature_2m_min") String tempMin,
                         @JsonProperty("apparent_temperature_max") String apparentTempMax,
                         @JsonProperty("apparent_temperature_min") String apparentTempMin,
                         @JsonProperty("precipitation_sum") String precipitationSum,
                         @JsonProperty("windspeed_10m_max") String windspeedMax) {

}