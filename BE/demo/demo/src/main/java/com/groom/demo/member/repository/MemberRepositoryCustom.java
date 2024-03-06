package com.groom.demo.member.repository;

import com.groom.demo.member.dto.MemberResponseDto;

import java.util.ArrayList;
import java.util.List;

public interface MemberRepositoryCustom {
List<MemberResponseDto> memberdata(String memberEmail, String memberPass);

}
