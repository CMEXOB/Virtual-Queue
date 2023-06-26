package com.controller;

import com.dto.UserDTO;
import com.entity.User;
import com.service.MappingService;
import com.service.QueueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("queue")
public class QueueController {
    private QueueService queueService;
    private MappingService mappingService;

    public QueueController(QueueService queueService, MappingService mappingService) {
        this.queueService = queueService;
        this.mappingService = mappingService;
    }

    @CrossOrigin
    @GetMapping()
    public List<UserDTO> getQueue(){
        List<UserDTO> returned = new ArrayList<>();
        for (User user : queueService.getQueue()){
            returned.add(mappingService.fromEntityToDTO(user));
        }
        return returned;
    }

    @MessageMapping("/take")
    @SendTo("/client/take")
    public UserDTO takeQueue(UserDTO userDTO){
        return mappingService.fromEntityToDTO(queueService.takeQueue(userDTO.getName()));
    }
    
    @MessageMapping("/leave")
    @SendTo("/client/leave")
    public UserDTO leaveQueue(UserDTO userDTO){
        queueService.leaveQueue(userDTO.getName());
        return userDTO;
    }
}
