package com.groom.demo.member.dto;

import jakarta.validation.constraints.Email;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@NoArgsConstructor
@Getter
public class MemberPageInfoDto {

    // 프로필페이지DTO == /jamonginfo
    @Email
    private String memberEmail;
    private String memberName;
    private String memberPhone;
    private String memberAddress;
    private String memberAddressDetail;
    private String memberAddressZip;
    private String memberFile;
    private LocalDateTime memberCreated;
    private LocalDateTime memberLastLogin;

    // 생성자를 만든다.
//    public MemberPageInfoDto(String memberEmail, String memberName, String memberPhone, String memberAddres, String memberFile, LocalDateTime memberCreated, LocalDateTime memberLastLogin) {
//        this.memberEmail = memberEmail;
//        this.memberName = memberName;
//        this.memberPhone = memberPhone;
//        this.memberAdres = memberAddres;
//        this.memberFile = memberFile;
//        this.memberCreated = memberCreated;
//        this.memberLastLogin = memberLastLogin;
//    }

    public MemberPageInfoDto(String memberEmail, String memberName, String memberPhone, String memberAddress, String memberAddressDetail, String memberAddressZip, String memberFile, LocalDateTime memberCreated, LocalDateTime memberLastLogin) {
        this.memberEmail = memberEmail;
        this.memberName = memberName;
        this.memberPhone = memberPhone;
        this.memberAddress = memberAddress;
        this.memberAddressDetail = memberAddressDetail;
        this.memberAddressZip = memberAddressZip;
        this.memberFile = memberFile;
        this.memberCreated = memberCreated;
        this.memberLastLogin = memberLastLogin;
    }
}
