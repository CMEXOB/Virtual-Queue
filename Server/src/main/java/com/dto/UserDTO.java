package com.dto;


import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

@Getter
@Setter
public class UserDTO {
    @NotEmpty
    @Size(min=3, message = "wrong size")
    private String name;
    private Long number;

    public UserDTO() {
    }
}
