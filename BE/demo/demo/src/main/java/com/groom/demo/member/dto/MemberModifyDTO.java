package com.groom.demo.member.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;

@Data
public class MemberModifyDTO implements Serializable {
    private String memberName;
    private String memberPass;
    private String memberPhone;
    private String memberAddress;
    private MultipartFile memberFile;
}
