package com.bundleup.controllers;

import com.bundleup.model.Clothes;
import com.bundleup.model.Combo;
import com.bundleup.model.ComboClothes;
import com.bundleup.model.Weather;
import com.bundleup.repository.ComboClothesRepository;
import com.bundleup.repository.ComboRepository;
import com.bundleup.repository.WeatherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TestController {


  private WeatherRepository weatherRepository;
  private ComboClothesRepository comboClothesRepository;

  private ComboRepository comboRepository;


  public TestController(WeatherRepository weatherRepository,
                        ComboClothesRepository comboClothesRepository,
                        ComboRepository comboRepository) {
    this.weatherRepository = weatherRepository;
    this.comboClothesRepository = comboClothesRepository;
    this.comboRepository=comboRepository;
  }

  @GetMapping("/")
  public String home() {





    return "home";
  }

  @GetMapping("/getclothes")
  public List<Clothes> home(@RequestParam(name = "temp") double temp,@RequestParam(name="rain") boolean rain) {

    List<Weather> weathers =(List<Weather>) weatherRepository.findAll().stream()
            .filter(w->w.getMax_temp()>=temp)
            .filter(w->w.getMin_temp()<=temp)
            .filter(w->w.getRain()==rain).toList();

    Weather weather=weathers.get(0);
    Combo combo=comboRepository.findByWeather(weather);


    var clothes=(List<Clothes>)comboClothesRepository.findClothesByComboID(combo.getId());


    return clothes;
  }
}