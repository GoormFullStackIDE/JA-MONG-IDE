package com.groom.demo.code.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CodeRequestDto {
    // 파일 이름
    private String name;
    // 파일 코드
    private String code;
    // 작성 언어
    private String language;
}
