package com.bundleup.model.database;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="weather")
public class Weather {
    @Id
    private Integer id;

    private Double min_temp;
    private Double max_temp;

    private Boolean rain;

}