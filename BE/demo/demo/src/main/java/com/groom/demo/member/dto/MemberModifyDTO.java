package com.groom.demo.member.dto;

import lombok.Data;

@Data
public class MemberModifyDTO {
    private String memberName;
    private String memberPass;
    private String memberPhone;
    private String memberAddress;
    private String memberAddressDetail;
    private String memberAddressZip;
    private String memberFile;
}
