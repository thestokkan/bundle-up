package com.bundleup.repository;

import com.bundleup.model.database.Clothes;
import com.bundleup.model.database.ComboClothes;
import com.bundleup.model.database.ComboClothesID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ComboClothesRepository extends JpaRepository<ComboClothes, ComboClothesID> {
    @Query("select c from ComboClothes c where c.comboClothesID.combo.id =:i")
    Iterable<ComboClothes> findByComboID(@Param("i") Long id);

    @Query("select c.comboClothesID.clothes from ComboClothes c where c.comboClothesID.combo.id =:i")
    Iterable<Clothes> findClothesByComboID(@Param("i") Long id);
}