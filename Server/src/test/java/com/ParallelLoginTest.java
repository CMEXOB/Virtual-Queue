package com;

import com.controller.UserController;
import com.dto.UserDTO;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;


@SpringBootTest
class ParallelLoginTest {
    static UserDTO userDTO;
    @Autowired
    private UserController userController;
    boolean isCreated = false;

    public synchronized boolean isCorrect(HttpStatus status){
        if(status.equals(HttpStatus.OK)){
            if(!isCreated){
                isCreated = true;
                return true;
            }
            else {
                return false;
            }
        }
        else if(status.equals(HttpStatus.FORBIDDEN)){
            return true;
        }

        return false;
    }

    public synchronized void output(HttpStatus status){
        System.out.println("testLogin = " + status);
        System.out.println(Thread.currentThread().getName());
        System.out.println("================");
    }

    @BeforeAll
    static void setupCounter() {
            userDTO = new UserDTO();
            userDTO.setName("max");
    }
    @Test
    public void testLogin1() {
        ResponseEntity entity = userController.login(userDTO);
        output(entity.getStatusCode());
        Assertions.assertEquals(isCorrect(entity.getStatusCode()), true);
    }

    @Test
    public void testLogin2() {
        ResponseEntity entity = userController.login(userDTO);
        output(entity.getStatusCode());
        Assertions.assertEquals(isCorrect(entity.getStatusCode()), true);
    }
    @Test
    public void testLogin3() {
        ResponseEntity entity = userController.login(userDTO);
        output(entity.getStatusCode());
        Assertions.assertEquals(isCorrect(entity.getStatusCode()), true);
    }

    @Test
    public void testLogin4() {
        ResponseEntity entity = userController.login(userDTO);
        output(entity.getStatusCode());
        Assertions.assertEquals(isCorrect(entity.getStatusCode()), true);
    }
}
