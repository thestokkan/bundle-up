package com.bundleup.services;

import com.bundleup.model.APImodels.LocationAPI;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class LocationService {
  private final String LOCATION_API_URL = "https://geocoding-api.open-meteo.com/v1/search?name=";
  RestTemplate restTemplate;

  public LocationService(RestTemplate restTemplate) {
    this.restTemplate = restTemplate;
  }

  public LocationAPI getLocations(String name) {
    return restTemplate.getForObject(LOCATION_API_URL + name, LocationAPI.class);
  }



}