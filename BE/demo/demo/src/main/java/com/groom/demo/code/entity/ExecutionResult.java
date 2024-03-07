package com.groom.demo.code.entity;

import lombok.Getter;
import lombok.Setter;


@Getter @Setter
public class ExecutionResult {
    // Getters and Setters
    private boolean success;
    private String output;
    private String error;
    private long executionTime; // Optional

    // 기본 생성자, 인자를 받는 생성자, getters 및 setters 생략

    public ExecutionResult(boolean success, String output, String error) {
        this.success = success;
        this.output = output;
        this.error = error;

    }

}