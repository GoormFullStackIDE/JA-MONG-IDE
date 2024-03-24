package com.groom.demo.member.dto;

import lombok.Data;

@Data
public class ProjectJoinOthersDTO {
    private String containerId;
    private String othersEmail;
    private Boolean isLeader;


}
