package com.groom.demo.member.service;

import com.groom.demo.member.dto.MemberResponseDto;

import java.util.List;

public interface MemberService  {

    List<MemberResponseDto> memberdata(String memberEmail, String memberPass);
}
