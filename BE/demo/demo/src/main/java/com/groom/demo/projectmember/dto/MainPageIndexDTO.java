package com.groom.demo.projectmember.dto;

import lombok.Data;

@Data
public class MainPageIndexDTO {
    private String containerId;
    private Boolean isLeader;

    public MainPageIndexDTO(String containerId, Boolean isLeader) {
        this.containerId = containerId;
        this.isLeader = isLeader;
    }
}
