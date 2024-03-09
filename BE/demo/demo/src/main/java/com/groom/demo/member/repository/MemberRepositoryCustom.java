package com.groom.demo.member.repository;

import com.groom.demo.auth.oauth.SocialType;
import com.groom.demo.member.dto.MemberPageInfoDto;

import java.util.List;
import java.util.Optional;

public interface MemberRepositoryCustom {
    List<MemberPageInfoDto> memberdata(String memberEmail, String memberPass);

    Optional<String> selectTokenByMemberNo(Long memberNo);

    Optional<Long> selectMemeberBySocialId(SocialType registrationId, String socialId);
}
