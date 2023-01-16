package com.bundleup.repository;

import com.bundleup.model.Weather;
import org.springframework.data.repository.CrudRepository;

public interface WeatherRepository extends CrudRepository<Weather,Integer> {
}
