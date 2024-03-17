package com.groom.demo.member.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class MemberloginDTO {
    @Email
    private String memberIdEmail;
    @NotBlank
    private String memberPass;


}
