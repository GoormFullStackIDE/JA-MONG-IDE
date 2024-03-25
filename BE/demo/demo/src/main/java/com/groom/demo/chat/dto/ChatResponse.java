package com.groom.demo.chat.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ChatResponse {
    private Long chatNo;
    private Long senderNo;
    private String msg;
    private LocalDateTime createdAt;
    private String memberMail;
    private String memberFile;
    private String memberName;

    @Builder
    public ChatResponse(Long chatNo, Long senderNo, String msg, LocalDateTime createdAt, String memberMail, String memberFile, String memberName) {
        this.chatNo = chatNo;
        this.senderNo = senderNo;
        this.msg = msg;
        this.createdAt = createdAt;
        this.memberMail = memberMail;
        this.memberFile = memberFile;
        this.memberName = memberName;
    }
}
