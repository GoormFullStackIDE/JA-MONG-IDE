package com.groom.demo.projectmember.dto;

import lombok.Data;

@Data
public class ProjectJoinOthersDTO {
    private String containerId;
    private String othersEmail;
    private Boolean isLeader;


}
