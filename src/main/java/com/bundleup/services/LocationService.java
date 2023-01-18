package com.bundleup.services;

import com.bundleup.model.APImodels.LocationAPI;
import com.bundleup.model.APImodels.LocationResult;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class LocationService {
  private final String LOCATION_API_URL = "https://geocoding-api.open-meteo.com/v1/search?name=";
  RestTemplate restTemplate;
  private LocationAPI locations;

  public LocationService(RestTemplate restTemplate) {
    this.restTemplate = restTemplate;
  }

  public LocationAPI result(String name) {
    if (locations == null) {
      locations = restTemplate.getForObject(LOCATION_API_URL + name, LocationAPI.class);
      System.out.println(LOCATION_API_URL + name);
    }
    return locations;
  }



}