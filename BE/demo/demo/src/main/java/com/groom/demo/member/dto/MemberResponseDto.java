package com.groom.demo.member.dto;

import lombok.Data;

import java.time.LocalDateTime;
@Data
public class MemberResponseDto {

    private String memberEmail;
    private String memeberName;
    private String memberPhone;
    private String memeberAdres;
    private LocalDateTime memberCreated;
    private LocalDateTime memberLastLogin;

    // 생성자를 만든다
    public MemberResponseDto(String memberEmail, String memeberName, String memberPhone, String memeberAdres, LocalDateTime memberCreated, LocalDateTime memberLastLogin) {
        this.memberEmail = memberEmail;
        this.memeberName = memeberName;
        this.memberPhone = memberPhone;
        this.memeberAdres = memeberAdres;
        this.memberCreated = memberCreated;
        this.memberLastLogin = memberLastLogin;
    }
}
