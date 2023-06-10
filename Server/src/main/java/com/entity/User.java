package com.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Getter
@Setter
@Table(name = "queue_user")
public class User {

    @Id
    private String name;
    private Long number;

    public User() {
    }

    public User(String name) {
        this.name = name;
    }
}
