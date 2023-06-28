package com.service;

import com.entity.User;
import com.repository.UserRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.InvalidDataAccessApiUsageException;
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
            try {
                userRepository.save(newUser);
                return true;
            }
            catch (DataIntegrityViolationException e){
                return false;
            }
        }
    }
    public void deleteUser(User user){
        if(!userRepository.existsById(user.getName())){
            throw new InvalidDataAccessApiUsageException("User not exist!");
        }
        userRepository.delete(userRepository.getUserById(user.getName()));
    }
}
