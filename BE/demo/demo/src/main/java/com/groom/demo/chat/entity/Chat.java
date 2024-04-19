package com.groom.demo.chat.entity;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document(collection = "chat")
public class Chat {
    @Transient
    public static final String SEQUENCE_NAME = "Chat_sequence";
    @Id
    private Long no;
    private Long senderNo;
    private String roomNo;
    private String msg;
    private boolean isDeleted;
    private LocalDateTime createdAt;
    private String senderMail;
    private String senderFile;
    private String senderName;

    @Builder
    public Chat(Long no, Long senderNo, String roomNo, String msg, boolean isDeleted, LocalDateTime createdAt, String senderMail, String senderFile, String senderName) {
        this.no = no;
        this.senderNo = senderNo;
        this.roomNo = roomNo;
        this.msg = msg;
        this.isDeleted = isDeleted;
        this.createdAt = createdAt;
        this.senderMail = senderMail;
        this.senderFile = senderFile;
        this.senderName = senderName;
    }
}
