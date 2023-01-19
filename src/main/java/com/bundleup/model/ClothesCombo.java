package com.bundleup.model;

import com.bundleup.model.database.Clothes;

import java.util.List;

public record ClothesCombo(
        List<Clothes> today,
        List<Clothes> tomorrow
) {}