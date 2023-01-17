package com.bundleup.repository;

import com.bundleup.model.Combo;
import com.bundleup.model.Weather;
import org.springframework.data.repository.CrudRepository;

public interface ComboRepository extends CrudRepository<Combo,Long> {
    Combo findByWeather(Weather weather);
}
