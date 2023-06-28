package com.controller;

import org.springframework.dao.InvalidDataAccessApiUsageException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.support.ErrorMessage;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionController {

    @ExceptionHandler( MethodArgumentNotValidException.class)
    protected ResponseEntity handleWrongNameSizeException(MethodArgumentNotValidException objException)
    {
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler( InvalidDataAccessApiUsageException.class)
    protected ResponseEntity handleException(InvalidDataAccessApiUsageException objException)
    {
        return new ResponseEntity<>(objException.getMessage(), HttpStatus.BAD_REQUEST);
    }
}
