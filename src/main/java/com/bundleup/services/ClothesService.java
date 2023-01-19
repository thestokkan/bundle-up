package com.bundleup.services;

import com.bundleup.model.*;
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

  private final int RAINAMOUNT = 0;
  private final int SNOWRAINTEMP = -4;

  private final WeatherRepository weatherRepository;

  private final ComboClothesRepository comboClothesRepository;
  private final ComboRepository comboRepository;


  public ClothesService(WeatherRepository weatherRepository,
                        ComboClothesRepository comboClothesRepository,
                        ComboRepository comboRepository) {
    this.weatherRepository = weatherRepository;
    this.comboClothesRepository = comboClothesRepository;
    this.comboRepository = comboRepository;
  }

  public ClothesCombo getClothesCombo(WeatherData weatherData) {
    return new ClothesCombo(getDailyCombo((WeatherDataBasic)weatherData, 0),
                            getDailyCombo((WeatherDataBasic)weatherData, 1));
  }

  private List<Clothes> getDailyCombo(WeatherDataBasic weatherData,
                                      int dayIndex) {
    DailyWeatherBasic dailyWeatherBasic = weatherData.getToday();
    if (dayIndex == 1) dailyWeatherBasic = weatherData.getTomorrow();
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