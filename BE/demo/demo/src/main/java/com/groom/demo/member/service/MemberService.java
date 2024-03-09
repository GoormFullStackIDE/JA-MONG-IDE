package com.groom.demo.member.service;

import com.groom.demo.member.dto.MemberPageInfoDto;

import java.util.List;

public interface MemberService  {

    List<MemberPageInfoDto> memberdata(String memberEmail, String memberPass);
}
