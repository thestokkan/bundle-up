package com.bundleup.model.APImodels;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public record LocationResult(
        Long id,
        String name,
        Double latitude,
        Double longitude,
        @JsonProperty("country_code")
        String countryCode,
        List<String> postcodes,
        String timezone,
        String country,
        String admin1,
        String admin2,
        String admin3,
        String admin4
) {}