package com.bundleup.repository;

import com.bundleup.model.Weather;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WeatherRepository extends JpaRepository<Weather,Integer> {
}