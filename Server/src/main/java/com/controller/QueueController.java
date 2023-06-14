package com.controller;

import com.entity.User;
import com.service.QueueService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("queue")
public class QueueController {
    private QueueService queueService;

    public QueueController(QueueService queueService) {
        this.queueService = queueService;
    }

    @CrossOrigin
    @GetMapping()
    public List<User> getQueue(){
        return queueService.getQueue();
    }

    @MessageMapping("/take")
    @SendTo("/client/take")
    public User takeQueue(User user){
        return queueService.takeQueue(user.getName());
    }
    
    @MessageMapping("/leave")
    @SendTo("/client/leave")
    public User leaveQueue(User user){
        queueService.leaveQueue(user.getName());
        return user;
    }
}
