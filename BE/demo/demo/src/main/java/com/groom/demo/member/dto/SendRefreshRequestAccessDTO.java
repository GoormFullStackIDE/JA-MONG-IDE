package com.groom.demo.member.dto;

import lombok.Data;

@Data
public class SendRefreshRequestAccessDTO {
    private String memberIdMail;
    private String memberToken;
}
