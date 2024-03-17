package com.groom.demo.member.service;

import com.groom.demo.member.dto.*;

import java.util.List;

public interface MemberService  {

    List<MemberPageInfoDto> memberdata(Long memberNo);

    //회원가입 Service
    void memberSignUp(MemberSignUpRequestDTO memberSignUpRequestDTO);

    //회원가입시 ID 중복 검사
    Boolean memberIdCheck(String memberId);

    // 일반 로그인
    Long memberLogin(String memberIdEmail, String memberPass);

    // 회원 탈퇴시
    Boolean memberIsDelete(Long memberNo);

    // 회원 조회시 IdMail&Name 같이 검색
    SearchMemberDTO searchmember(String idmail);

    // ID 조회시 이름 & 휴대폰번호 검사
    List<String> findEmail(MemberIDFindDTO memberIDFindDTO);

    // 임시비밀번호를 DB에 저장(update)하고, 임시비밀번호를 controller로 가져갈 함수
    String temporaryPW(String memberIdeMail, String memberName, String memberPhone);

    // 프로필 편집 시 이전 값과 같은지 확인하기
    Boolean isProfileOK(String memberPass, Long memberTokenNo);

    // 프로필 편집
    void memberProfileModify(MemberModifyDTO memberModifyDTO, Long memberTokenNo, String imgLink);

}
