package com.groom.demo.member.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class PhoneCertificationDTO {
    @NotBlank
    private String memberPhone;

}
