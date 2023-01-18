package com.bundleup.controllers;


import com.bundleup.model.APImodels.LocationAPI;
import com.bundleup.services.LocationService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LocationController {

  private final LocationService locationService;

  public LocationController(LocationService locationService) {
    this.locationService = locationService;
  }

  @GetMapping("/location")
  public LocationAPI getLocation(@RequestParam("name") String name) {
    return locationService.getLocations(name);
  }
}