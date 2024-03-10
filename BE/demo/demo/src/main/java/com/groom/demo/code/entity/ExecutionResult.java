package com.groom.demo.code.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter @Setter
@NoArgsConstructor
public class ExecutionResult {
    // Getters and Setters
    private boolean success;
    private String output;
    private String error;
    private long executionTime;

    public ExecutionResult(boolean b, String logs, String s) {
    }
}