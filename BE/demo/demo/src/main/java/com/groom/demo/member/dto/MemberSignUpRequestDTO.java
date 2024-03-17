package com.groom.demo.member.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class MemberSignUpRequestDTO {
    @Email
    private String memberIdMail;
    @NotBlank
    private String memberName;
    @NotBlank
    private String memberPass;
    private String memberPhone;
    private String memberAdress;

}
