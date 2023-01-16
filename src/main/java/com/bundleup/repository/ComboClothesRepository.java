package com.bundleup.repository;

import com.bundleup.model.ComboClothes;
import com.bundleup.model.ComboClothesID;
import org.springframework.data.repository.CrudRepository;

public interface ComboClothesRepository extends CrudRepository<ComboClothes,ComboClothesID> {
}
