package com.bundleup.repository;

import com.bundleup.model.ComboClothes;
import com.bundleup.model.ComboClothesID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ComboClothesRepository extends JpaRepository<ComboClothes, ComboClothesID> {
}