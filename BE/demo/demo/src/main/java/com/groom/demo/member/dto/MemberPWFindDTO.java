package com.groom.demo.member.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class MemberPWFindDTO {
    @Email
    private String memberIdMail;
    @NotBlank
    private String memberName;
    @NotBlank
    private String memberPhone;
}
