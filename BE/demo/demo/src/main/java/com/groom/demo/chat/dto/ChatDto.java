package com.groom.demo.chat.dto;

import lombok.Data;

import java.time.LocalDateTime;
@Data
public class ChatDto {
    private Long id;
    private Long senderNo;
    private String roomNo;
    private String msg;
    private boolean isDeleted;
    private LocalDateTime createdAt;
}
