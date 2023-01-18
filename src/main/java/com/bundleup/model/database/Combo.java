package com.bundleup.model.database;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="combo")
public class Combo {

    @Id
    private Long id;

    @ManyToOne
    @JoinColumn(name = "weather_id", referencedColumnName = "id")
    private Weather weather;


}