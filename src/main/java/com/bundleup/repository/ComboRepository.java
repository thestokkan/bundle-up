package com.bundleup.repository;

import com.bundleup.model.database.Combo;
import com.bundleup.model.database.Weather;
import org.springframework.data.repository.CrudRepository;

public interface ComboRepository extends CrudRepository<Combo,Long> {
    Combo findByWeather(Weather weather);
}