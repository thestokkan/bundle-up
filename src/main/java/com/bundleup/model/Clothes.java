package com.bundleup.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="clothes")
public class Clothes {

    @Id
    private Long id;

    private String name;
}
