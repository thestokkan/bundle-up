package com.bundleup.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class ComboClothesID implements Serializable {
    @MapsId("id")
    @ManyToOne
    private Clothes clothes;

    @MapsId("id")
    @ManyToOne
    private  Combo combo;

}
