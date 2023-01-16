package com.bundleup.weatherApi;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record Daily(String[] time,
                    int[] weathercode,
                    double[] temperature_2m_max,
                    double[] temperature_2m_min,
                    double[] apparent_temperature_max,
                    double[] apparent_temperature_min,
                    double[] rain_sum,
                    double[] snowfall_sum,
                    double[] windspeed_10m_max) {}