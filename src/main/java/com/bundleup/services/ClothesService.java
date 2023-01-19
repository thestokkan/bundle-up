package com.bundleup.services;

import com.bundleup.model.ClothesCombo;
import com.bundleup.model.DailyWeather;
import com.bundleup.model.WeatherData;
import com.bundleup.model.database.Clothes;
import com.bundleup.model.database.Combo;
import com.bundleup.model.database.Weather;
import com.bundleup.repository.ComboClothesRepository;
import com.bundleup.repository.ComboRepository;
import com.bundleup.repository.WeatherRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClothesService {

  private int RAINAMOUNT = 0;
  private int SNOWRAINTEMP = -4;

  private WeatherService weatherService;
  private WeatherRepository weatherRepository;

  private ComboClothesRepository comboClothesRepository;
  private ComboRepository comboRepository;


  public ClothesService(WeatherService weatherService,
                        WeatherRepository weatherRepository,
                        ComboClothesRepository comboClothesRepository,
                        ComboRepository comboRepository) {
    this.weatherService = weatherService;
    this.weatherRepository = weatherRepository;
    this.comboClothesRepository = comboClothesRepository;
    this.comboRepository = comboRepository;
  }

  public ClothesCombo getClothesCombo(WeatherData weatherData) {
    return new ClothesCombo(getDailyCombo(weatherData, 0), getDailyCombo(weatherData, 1));
  }

  private List<Clothes> getDailyCombo(WeatherData weatherData,
                                      int dayIndex) {
    DailyWeather dailyWeatherBasic = weatherData.today();
    if (dayIndex == 1) dailyWeatherBasic = weatherData.tomorrow();
    double minTemp = dailyWeatherBasic.minApparentTempDay();

    boolean rain = dailyWeatherBasic.precipitationSumDay() > RAINAMOUNT && minTemp > SNOWRAINTEMP;

    List<Weather> weathers =
            weatherRepository.findAll().stream().filter(w -> w.getMax_temp() >= minTemp)
                             .filter(w -> w.getMin_temp() <= minTemp)
                             .filter(w -> w.getRain() == rain).toList();

    Weather weather = weathers.get(0);
    Combo combo = comboRepository.findByWeather(weather);
    return (List<Clothes>) comboClothesRepository.findClothesByComboID(combo.getId());
  }

}