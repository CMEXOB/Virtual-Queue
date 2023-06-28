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

    public User takeQueue(String userName){
        User user = userRepository.getUserById(userName);
        synchronized(this){
            User lastUser = userRepository.getLast();
            if(lastUser == null){
                user.setNumber(1L);
            }
            else {
                user.setNumber(lastUser.getNumber() + 1);
            }
            userRepository.save(user);
        }
        return user;
    }
    public void leaveQueue(String userName){
        User user = userRepository.getUserById(userName);

        synchronized(this) {
            List<User> users = userRepository.getQueueAfter(user.getNumber());
            for (User temp : users) {
                temp.setNumber(temp.getNumber() - 1);
                userRepository.save(temp);
            }
            user.setNumber(0L);
            userRepository.save(user);
        }
    }
    public boolean isInQueue(String userName){
        User user = userRepository.getUserById(userName);
        return user != null && user.getNumber() != 0;
    }
}
