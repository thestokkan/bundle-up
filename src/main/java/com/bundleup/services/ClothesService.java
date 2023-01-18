package com.bundleup.services;

import com.bundleup.model.DailyWeather;
import com.bundleup.model.WeatherData;
import com.bundleup.model.database.Clothes;
import com.bundleup.model.database.Combo;
import com.bundleup.model.database.Weather;
import com.bundleup.repository.ComboClothesRepository;
import com.bundleup.repository.ComboRepository;
import com.bundleup.repository.WeatherRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Service
public class ClothesService {

    private int RAINAMOUNT=0;
    private int SNOWRAINTEMP=-4;

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

    public List<Clothes> weatherTooClothes(int index) {
        DailyWeather dailyWeather=weatherService.getDailyWeatherData(index);

        double temp= dailyWeather.minTemp();

        boolean rain= dailyWeather.precipitationSum()>RAINAMOUNT && temp>SNOWRAINTEMP;

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
