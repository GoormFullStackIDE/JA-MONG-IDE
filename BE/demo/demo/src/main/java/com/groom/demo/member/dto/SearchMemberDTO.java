package com.groom.demo.member.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class SearchMemberDTO {
    private String memberIdMail;
    private String memberName;

    public SearchMemberDTO(String memberIdMail, String memberName) {
        this.memberIdMail = memberIdMail;
        this.memberName = memberName;
    }
}
