package com.groom.demo.member.repository;

import com.groom.demo.auth.oauth.SocialType;
import com.groom.demo.member.dto.MemberPageInfoDto;
import com.groom.demo.member.dto.SearchMemberDTO;
import com.groom.demo.member.entity.Member;

import java.util.List;
import java.util.Optional;

public interface MemberRepositoryCustom {
    List<MemberPageInfoDto> memberdata(Long memberNo);

    Optional<String> selectTokenByMemberNo(Long memberNo);

    Optional<Long> selectMemberBySocialId(SocialType registrationId, String socialId);

    //회원가입시 ID 중복체크
    Optional<String> selectMemberIdCheck(String memberId);

    // 일반로그인
    Optional<Member> selectMemberLogin(String memberIdEmail);

    // 회원 ID 조회(성공시 ID와 이름 함께 보내줌)
    Optional<SearchMemberDTO> searchMember(String memberIdMail);

    // ID 찾기(휴대폰인증 후 통과하면 ID로 사용한 mail 알려줌)
    List<String> memberIDFind(String memberName, String memberPhone);

    // PW 찾기(휴대폰인증 후 통과하면 본인 이메일로 임시 PW 전송)
    Optional<Member> memberPWFind(String memberIdeMail, String memberName, String memberPhone);

    // RefreshToken과 Mail 같은지 확인
    Optional<Long> memberRefreshTokenAndIdMail(String memberIdMail, String memberToken);

}
