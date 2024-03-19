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

    @Builder
    public ChatResponse(Long no, Long senderNo, String msg, LocalDateTime createdAt) {
        this.chatNo = no;
        this.senderNo = senderNo;
        this.msg = msg;
        this.createdAt = createdAt;
    }
}
