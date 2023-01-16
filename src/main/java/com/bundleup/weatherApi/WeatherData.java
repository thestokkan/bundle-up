package com.bundleup.weatherApi;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public record WeatherData(double latitude,
                          double longitude,
                          DailyUnits daily_units,
                          Daily daily) {

}