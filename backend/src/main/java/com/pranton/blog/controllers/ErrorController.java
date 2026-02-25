package com.pranton.blog.controllers;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import com.pranton.blog.dto.ApiErrorResponse;

import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;

@RestController
@ControllerAdvice
@Slf4j
public class ErrorController {
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiErrorResponse> handleException(Exception ex) {
        log.error("Caught Exception ", ex);
        ApiErrorResponse error = ApiErrorResponse.builder().status(HttpStatus.INTERNAL_SERVER_ERROR.value()).message(ex.getMessage()).build();
        return ResponseEntity.internalServerError().body(error);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ApiErrorResponse> handleIllegalArgumentException(IllegalArgumentException ex) {
        ApiErrorResponse apiErrorResponse = ApiErrorResponse.builder().status(HttpStatus.BAD_REQUEST.value()).message(ex.getMessage()).build();
        return ResponseEntity.badRequest().body(apiErrorResponse);
    }

    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<ApiErrorResponse> handleIllegalStateException(IllegalStateException ex) {
        ApiErrorResponse apiErrorResponse = ApiErrorResponse.builder().status(409).message(ex.getMessage()).build();
        return ResponseEntity.status(apiErrorResponse.getStatus()).body(apiErrorResponse);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ApiErrorResponse> handleBadCredentialsException(BadCredentialsException ex) {
        ApiErrorResponse apiErrorResponse = ApiErrorResponse.builder().status(HttpStatus.UNAUTHORIZED.value()).message(ex.getMessage()).build();
        return ResponseEntity.status(apiErrorResponse.getStatus()).body(apiErrorResponse);
    }
    

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handleEntityNotFoundException(EntityNotFoundException ex) {
        ApiErrorResponse apiErrorResponse = ApiErrorResponse.builder().status(HttpStatus.NOT_FOUND.value()).message(ex.getMessage()).build();
        return ResponseEntity.status(apiErrorResponse.getStatus()).body(apiErrorResponse);
    }
    
    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<ApiErrorResponse> handleNoResourceFoundException(NoResourceFoundException ex) {
        ApiErrorResponse apiErrorResponse = ApiErrorResponse.builder().status(HttpStatus.NOT_FOUND.value()).message(ex.getMessage()).build();
        return ResponseEntity.status(apiErrorResponse.getStatus()).body(apiErrorResponse);
    }    

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ApiErrorResponse> handleMethodArgumentTypeMismatchException(MethodArgumentTypeMismatchException ex) {
        ApiErrorResponse apiErrorResponse = ApiErrorResponse.builder().status(HttpStatus.NOT_FOUND.value()).message(ex.getMessage()).build();
        return ResponseEntity.status(apiErrorResponse.getStatus()).body(apiErrorResponse);
    }    

    

}
