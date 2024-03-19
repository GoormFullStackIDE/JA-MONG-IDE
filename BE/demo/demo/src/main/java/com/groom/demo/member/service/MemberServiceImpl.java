package com.groom.demo.member.service;

import com.groom.demo.auth.oauth.SocialType;
import com.groom.demo.member.dto.*;
import com.groom.demo.member.entity.Member;
import com.groom.demo.member.repository.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@Service
@Transactional
@Slf4j
public class MemberServiceImpl implements MemberService {

    @Autowired
    private MemberRepository memberRepository;

    // Memberinfo
    @Override
    public List<MemberPageInfoDto> memberdata(Long memberNo) {
        return memberRepository.memberdata(memberNo);
    }

    // 일반 회원가입시 주는 데이터
    @Override
    public void memberSignUp(MemberSignUpRequestDTO memberSignUpRequestDTO) {
//
//        JsonWebToken jsonWebToken = JwtTokenUtils.allocateToken(normalLogin, "ROLE_USER");
//        response.addHeader("Authorization", jsonWebToken.getAccessToken());
        memberRepository.save(Member.builder()
                .memberIdEmail(memberSignUpRequestDTO.getMemberIdMail())
                .memberName(memberSignUpRequestDTO.getMemberName())
                .memberPass(
                        BCrypt.hashpw(memberSignUpRequestDTO.getMemberPass(), BCrypt.gensalt())
                )
                .memberPhone(memberSignUpRequestDTO.getMemberPhone())
                .memberAddress(memberSignUpRequestDTO.getMemberAddress())
                .memberAddressDetail(memberSignUpRequestDTO.getMemberAddressDetail())
                .memberZip(memberSignUpRequestDTO.getMemberZip())
                .memberDate(LocalDateTime.now())
                .memberLastLogin(LocalDateTime.now())
                .memberSocialType(SocialType.NORMAL)
                .build());
    }

    // 회원가입시 ID 중복검사
    // 비어있으면 true == ID 사용 가능
    // 비어있지 않으면 false == ID 사용 불가능
    @Override
    public Boolean memberIdCheck(String memberId) {
        if (memberRepository.selectMemberIdCheck(memberId).isEmpty()) {
            return true;
        } else {
            return false;
        }
    }

    // 일반로그인
    // isEmpty면 true라면 로그인 불가능
    // isEmpty가 false라면 로그인 가능
    @Override
    public Long memberLogin(String memberIdEmail, String memberPass) {
        Optional<Member> normalLogin = memberRepository.selectMemberLogin(memberIdEmail);
        if (normalLogin.isEmpty() || !BCrypt.checkpw(memberPass,normalLogin.get().getMemberPass()) ) {
            return null;
        } else {
            Member member = normalLogin.get();
            Long plusLastLogin = member.getMemberNo();
            member.lastLoginRecord(LocalDateTime.now());
            return plusLastLogin;
        }
    }

    // 회원탈퇴는 즉각적으로 이뤄져야 하기 때문에
    // getReferenceById를 사용한다. Optional~~select는 중괄호가 끝날 때 보통 받아와서 조금 느리다.(JPA특성?)
    // 사용자가 회원 탈퇴 버튼을 누르는 순간 값이 true로 변경된다.
    @Override
    public Boolean memberIsDelete(Long memberNo) {
        Member member = memberRepository.getReferenceById(memberNo);
        member.memberDelete(true);
        return true;
    }

    // 회원 idMail로 검색시 이름과 mail 함께 검색하기
    // orElseThrow() : Optional일 때만 사용 가능.
    // 만약 오류가 나면, 그냥 던지겠다! 로그로 찍어주겠다.
    // 오류가 나지 않으면, 데이터를 뽑아서 보내주겠다.
    @Override
    public SearchMemberDTO searchmember(String idmail) {
        return memberRepository.searchMember(idmail)
                .orElse(new SearchMemberDTO(null, null));
    }

    // ID 찾기할 때 이름과 휴대폰번호가 동일한지 검사한 후,
    // 휴대폰 인증 후에 통과되면 ID로 사용했던 mail 알려주기
    @Override
    public List<String> findEmail(MemberIDFindDTO memberIDFindDTO) {
        return memberRepository.memberIDFind(memberIDFindDTO.getMemberName(), memberIDFindDTO.getMemberPhone());
    }

    // PW찾기할 때, 이메일 & 이름 & 휴대폰번호 검사한 후
    // 휴대폰 인증 후에 통과되면 본인 email로 임시비밀번호 발급하기
    //.orElseThrow() == 없으면 그냥 오류메세지를 서버에 띄우겠다.
    @Override
    public String temporaryPW(String memberIdeMail, String memberName, String memberPhone) {
        Member temporaryMail = memberRepository.memberPWFind(memberIdeMail, memberName, memberPhone)
                .orElseThrow();

        String sendPW = getTempPassword();
        temporaryMail.memberUpdatePW(sendPW);
        return sendPW;
    }

    // 프로필 편집시 이전 데이터와 같은지 비교 확인하기
    @Override
    public Boolean isProfileOK(String memberPass, Long memberTokenNo) {
        Member isPreDateOK = memberRepository.getReferenceById(memberTokenNo);
        String isPassOK = isPreDateOK.getMemberPassHistory();
        log.info("이전 비밀번호는 {}",isPassOK);
        log.info("바꿀 비밀번호는 {}",memberPass);

        //비밀번호 같으면 false
        if ( BCrypt.checkpw(memberPass,isPassOK)){
            return false;
        }else{
            return true;
        }
    }

    // 프로필 편집
    @Override
    public void memberProfileModify(MemberModifyDTO memberModifyDTO, Long memberTokenNo, String imgLink) {
        Member memberProfileModify = memberRepository.getReferenceById(memberTokenNo);
        memberProfileModify.memberModify(memberModifyDTO, imgLink, memberProfileModify.getMemberPass());

    }

    //랜덤함수로 임시비밀번호 구문 만들기
    public String getTempPassword() {
        char[] charSet = new char[]{'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F',
                'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'};

        String str = "";

        // 문자 배열 길이의 값을 랜덤으로 10개를 뽑아 구문을 작성함
        int idx = 0;
        for (int i = 0; i < 10; i++) {
            idx = (int) (charSet.length * Math.random());
            str += charSet[idx];
        }
        return str;
    }

}
