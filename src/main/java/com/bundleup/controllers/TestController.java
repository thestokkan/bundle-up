package com.bundleup.controllers;

import com.bundleup.model.ComboClothes;
import com.bundleup.model.Weather;
import com.bundleup.repository.ComboClothesRepository;
import com.bundleup.repository.WeatherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TestController {


  @GetMapping("/")
  public String home() {



    return "home";
  }
}