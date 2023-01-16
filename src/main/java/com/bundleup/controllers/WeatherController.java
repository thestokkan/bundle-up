package com.bundleup.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.client.RestTemplate;

public class WeatherController {
  RestTemplate restTemplate;
  ObjectMapper mapper;

  public WeatherController(RestTemplate restTemplate,
                           ObjectMapper mapper) {
    this.restTemplate = restTemplate;
    this.mapper = mapper;
  }



}