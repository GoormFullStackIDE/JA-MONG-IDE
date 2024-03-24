package com.groom.demo.projectmember.dto;

import lombok.Data;

@Data
public class MainPageIndexDTO {
    private String containerId;
    private String projectName;
    private Boolean isLeader;

    public MainPageIndexDTO(String containerId,String projectName, Boolean isLeader) {
        this.containerId = containerId;
        this.projectName = projectName;
        this.isLeader = isLeader;
    }
}
