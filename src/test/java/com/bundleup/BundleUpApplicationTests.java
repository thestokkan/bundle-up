package com.bundleup;


import com.bundleup.model.database.*;
import com.bundleup.repository.ClothesRepository;
import com.bundleup.repository.ComboClothesRepository;
import com.bundleup.repository.ComboRepository;
import com.bundleup.repository.WeatherRepository;
import org.junit.Assert;
import org.junit.Test;
import org.junit.jupiter.api.Assertions;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest

public class BundleUpApplicationTests {

    @Autowired
    private ClothesRepository clothesRepository;
    @Autowired
    private ComboClothesRepository comboClothesRepository;
    @Autowired
    private ComboRepository comboRepository;
    @Autowired
    private WeatherRepository weatherRepository;


    @Test
    public void WeatherTester() {

        var weathers = (List<Weather>) weatherRepository.findAll();
        int length = weathers.size();
        double min = weathers.get(0).getMin_temp();
        double max = weathers.get(0).getMax_temp();

        Assert.assertTrue("max should be bigger then min", max >= min);
        Assert.assertEquals(10, length);
        Assert.assertEquals(true, weatherRepository
                .findById(2)
                .get()
                .getRain());

    }

    @Test
    public void comboTester() {

        var combos = (List<Combo>) comboRepository.findAll();

        var id = (int) comboRepository.
                findById(2L)
                .get()
                .getWeather()
                .getId();

        Assert.assertEquals(10, combos.size());
        Assert.assertEquals(2, id);


    }

    @Test
    public void clothesTester() {
        var clothes = (List<Clothes>) clothesRepository.findAll();
        boolean contains = clothes.stream()
                .anyMatch((c) -> c.getName().equals("Innerlag"));

        Assert.assertEquals(6, clothes.size());
        Assert.assertTrue(contains);

    }

    @Test
    public void comboClothesTester() {
        Clothes clothes = clothesRepository.findById(1L).get();
        Combo combo = comboRepository.findById(1L).get();

        var comboClothes = comboClothesRepository
                .findById(new ComboClothesID(clothes, combo)).get();
        Assert.assertEquals(combo, comboClothes.getComboClothesID().getCombo());
        Assert.assertEquals(clothes, comboClothes.getComboClothesID().getClothes());
    }

    @Test
    public void comboClothesQueryTester() {
        var comboClothesQuery = (List<ComboClothes>) comboClothesRepository.findByComboID(1L);

        var comboClothes = comboClothesRepository.findAll();
        List<ComboClothes> comboClothesWithCombosId = comboClothes.stream()
                .filter(c -> c.getComboClothesID().getCombo().getId() == 1L).toList();

        Assertions.assertIterableEquals(comboClothesWithCombosId, comboClothesQuery);

        var clothesQuery = (List<Clothes>) comboClothesRepository.findClothesByComboID(1L);
        List<Clothes> clothesWithComboId = comboClothes.stream()
                .filter(c -> c.getComboClothesID().getCombo().getId() == 1L)
                .map(c -> c.getComboClothesID().getClothes())
                .toList();

        Assertions.assertIterableEquals(clothesQuery, clothesWithComboId);


    }

}