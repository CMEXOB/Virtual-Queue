package com.service;

import com.entity.User;
import com.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    public boolean saveUser(User newUser){
        if(userRepository.existsById(newUser.getName())){
            return false;
        }
        else {
            userRepository.save(newUser);
            return true;
        }
    }
    public void deleteUser(User user){
        userRepository.delete(userRepository.getUserById(user.getName()));
    }
}
