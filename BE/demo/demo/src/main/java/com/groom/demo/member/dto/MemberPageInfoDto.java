package com.groom.demo.member.dto;

import lombok.Data;

import java.time.LocalDateTime;
@Data
public class MemberPageInfoDto {

    // 프로필페이지DTO == /jamonginfo
    private String memberEmail;
    private String memeberName;
    private String memberPhone;
    private String memeberAdres;
    private String memberFile;
    private LocalDateTime memberCreated;
    private LocalDateTime memberLastLogin;

    // 생성자를 만든다.
    public MemberPageInfoDto(String memberEmail, String memeberName, String memberPhone, String memeberAdres, String memberFile, LocalDateTime memberCreated, LocalDateTime memberLastLogin) {
        this.memberEmail = memberEmail;
        this.memeberName = memeberName;
        this.memberPhone = memberPhone;
        this.memeberAdres = memeberAdres;
        this.memberFile = memberFile;
        this.memberCreated = memberCreated;
        this.memberLastLogin = memberLastLogin;
    }
}
