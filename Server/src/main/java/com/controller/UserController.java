package com.controller;

import com.dto.UserDTO;
import com.entity.User;
import com.service.MappingService;
import com.service.QueueService;
import com.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
public class UserController {
    private UserService userService;
    private QueueService queueService;
    private SimpMessagingTemplate template;
    private MappingService mappingService;

    public UserController(UserService userService, QueueService queueService, SimpMessagingTemplate template, MappingService mappingService) {
        this.userService = userService;
        this.queueService = queueService;
        this.template = template;
        this.mappingService = mappingService;
    }

    @CrossOrigin
    @PostMapping("/login")
    public ResponseEntity login(@Valid @RequestBody UserDTO registry){
        boolean result = userService.saveUser(mappingService.fromDTOToEntity(registry));
        if(result){
            return new ResponseEntity<>(HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }

    @CrossOrigin
    @DeleteMapping("/logout")
    public ResponseEntity logout(@Valid @RequestBody UserDTO userDTO){
        User logoutUser = mappingService.fromDTOToEntity(userDTO);
        if(queueService.isInQueue(logoutUser.getName())) {
            queueService.leaveQueue(logoutUser.getName());
            this.template.convertAndSend("/client/leave", logoutUser);
        }
        userService.deleteUser(logoutUser);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
