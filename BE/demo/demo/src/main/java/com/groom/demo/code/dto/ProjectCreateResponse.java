package com.groom.demo.code.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ProjectCreateResponse {
    private String containerId;
    private String message;

    public ProjectCreateResponse(String containerId, String message) {
        this.containerId = containerId;
        this.message = message;
    }
}
