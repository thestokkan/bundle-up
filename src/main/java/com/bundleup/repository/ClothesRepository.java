package com.bundleup.repository;

import com.bundleup.model.database.Clothes;
import org.springframework.data.repository.CrudRepository;

public interface ClothesRepository extends CrudRepository<Clothes,Long> {


}