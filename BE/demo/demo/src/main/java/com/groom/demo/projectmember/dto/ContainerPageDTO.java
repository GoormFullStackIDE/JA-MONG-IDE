package com.groom.demo.projectmember.dto;

import lombok.Data;

@Data
public class ContainerPageDTO {
    private String memberMail;
    private String memberName;
    private Boolean isLeader;

    public ContainerPageDTO(String memberMail, String memberName, Boolean isLeader) {
        this.memberMail = memberMail;
        this.memberName = memberName;
        this.isLeader = isLeader;
    }
}
