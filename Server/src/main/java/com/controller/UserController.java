package com.controller;

import com.entity.User;
import com.service.QueueService;
import com.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {
    private UserService userService;
    private QueueService queueService;
    private SimpMessagingTemplate template;

    public UserController(UserService userService, QueueService queueService, SimpMessagingTemplate template) {
        this.userService = userService;
        this.queueService = queueService;
        this.template = template;
    }

    @CrossOrigin
    @PostMapping("/login")
    public HttpStatus login(@RequestBody User registry){
        boolean result = userService.saveUser(registry);
        if(result){
            return HttpStatus.CREATED;
        }
        else {
            return HttpStatus.FORBIDDEN;
        }
    }

    @CrossOrigin
    @DeleteMapping("/logout")
    public HttpStatus logout(@RequestBody User logoutUser){
        if(queueService.isInQueue(logoutUser.getName())) {
            queueService.leaveQueue(logoutUser.getName());
            this.template.convertAndSend("/client/leave", logoutUser);
        }
        userService.deleteUser(logoutUser);
        return HttpStatus.OK;
    }

}
