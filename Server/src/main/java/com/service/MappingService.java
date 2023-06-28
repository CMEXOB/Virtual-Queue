package com.service;

import com.dto.UserDTO;
import com.entity.User;
import org.springframework.stereotype.Service;

@Service
public class MappingService {
    public UserDTO fromEntityToDTO(User user){
        UserDTO returned = new UserDTO();
        returned.setName(user.getName());
        returned.setNumber(user.getNumber());
        return returned;
    }


    public User fromDTOToEntity(UserDTO userDTO){
        User returned = new User();
        returned.setName(userDTO.getName());
        if(userDTO.getNumber() != null){
            returned.setNumber(userDTO.getNumber());
        }
        return returned;
    }
}
