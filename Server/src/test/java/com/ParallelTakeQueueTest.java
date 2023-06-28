package com;

import com.controller.QueueController;
import com.controller.UserController;
import com.dto.UserDTO;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;


@SpringBootTest
class ParallelTakeQueueTest {
    static List<UserDTO> users;
    @Autowired
    private UserController userController;
    @Autowired
    private QueueController queueController;
    static int counter;

    public synchronized boolean isCorrect(UserDTO user){
        counter++;
        return counter == user.getNumber();
    }

    public synchronized void output(UserDTO user){
        System.out.println(user.getName());
        System.out.println(user.getNumber());
        System.out.println(Thread.currentThread().getName());
        System.out.println("================");
    }

    @BeforeAll
    static void setupCounter() {
        users = new ArrayList<>();
        counter = 0;
        UserDTO userDTO = new UserDTO();
        userDTO.setName("max");
        users.add(userDTO);

        userDTO = new UserDTO();
        userDTO.setName("marya");
        users.add(userDTO);

        userDTO = new UserDTO();
        userDTO.setName("egor");
        users.add(userDTO);

        userDTO = new UserDTO();
        userDTO.setName("oleg");
        users.add(userDTO);
    }
    @Test
    public void testTakeQueue1() {
        userController.login(users.get(0));
        UserDTO entity = queueController.takeQueue(users.get(0));
        output(entity);
        Assertions.assertEquals(isCorrect(entity), true);
    }

    @Test
    public void testTakeQueue2() {
        userController.login(users.get(1));
        UserDTO entity = queueController.takeQueue(users.get(1));
        output(entity);
        Assertions.assertEquals(isCorrect(entity), true);
    }
    @Test
    public void testTakeQueue3() {
        userController.login(users.get(2));
        UserDTO entity = queueController.takeQueue(users.get(2));
        output(entity);
        Assertions.assertEquals(isCorrect(entity), true);
    }

    @Test
    public void testTakeQueue4() {
        userController.login(users.get(3));
        UserDTO entity = queueController.takeQueue(users.get(3));
        output(entity);
        Assertions.assertEquals(isCorrect(entity), true);
    }
}
