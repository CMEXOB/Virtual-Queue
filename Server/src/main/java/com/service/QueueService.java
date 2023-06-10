package com.service;

import com.entity.User;
import com.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QueueService {
    private UserRepository userRepository;

    public QueueService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getQueue() {
        return userRepository.getQueue();
    }

    public void takeQueue(String userName){
        User user = userRepository.getUserById(userName);
        User lastUser = userRepository.getLast();
        if(lastUser == null){
            user.setNumber(1L);
        }
        else {
            user.setNumber(lastUser.getNumber() + 1);
        }
    }
    public void leaveQueue(String userName){
        User user = userRepository.getUserById(userName);
        List<User> users= userRepository.getQueueAfter(user.getNumber());
        for(User temp : users){
            temp.setNumber(temp.getNumber() - 1);
            userRepository.save(temp);
        }
        userRepository.delete(user);
    }
}
