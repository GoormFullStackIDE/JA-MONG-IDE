package com.groom.demo.member.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class MemberIDFindDTO {
    @NotBlank
    private String memberName;
    @NotBlank
    private String memberPhone;
}
