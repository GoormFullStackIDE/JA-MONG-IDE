package com.groom.demo.member.repository;

import com.groom.demo.auth.oauth.SocialType;
import com.groom.demo.member.dto.MemberPageInfoDto;
import com.groom.demo.member.dto.SearchMemberDTO;
import com.groom.demo.member.entity.Member;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

import static com.groom.demo.member.entity.QMember.member;

public class MemberRepositoryImpl implements MemberRepositoryCustom {
    @Autowired
    private JPAQueryFactory queryFactory;

    // 프로필페이지DTO == /jamonginfo보기
    @Override
    public List<MemberPageInfoDto> memberdata(Long memberNo) {

        return queryFactory.select(
                        Projections.constructor(MemberPageInfoDto.class,
                                member.memberIdEmail,
                                member.memberName,
                                member.memberPhone,
                                member.memberAddress,
                                member.memberAddressDetail,
                                member.memberZip,
                                member.memberFile,
                                member.memberDate,
                                member.memberLastLogin)
                )
                .from(member)
                .where(member.memberNo.eq(memberNo))
                .fetch();
    }

    // Token 받아오기
    @Override
    public Optional<String> selectTokenByMemberNo(Long memberNo) {
        return Optional.ofNullable(
                queryFactory.select(member.memberToken)
                        .from(member)
                        .where(member.memberNo.eq(memberNo))
                        .where().fetchFirst());
    }

    // 소셜로그인시 kakao. google. naver. github중 무엇인지 파악한 뒤, 첫 로그인인지 판별
    @Override
    public Optional<Long> selectMemberBySocialId(SocialType registrationId, String socialId) {
        return Optional.ofNullable(
                queryFactory.select(member.memberNo)
                        .from(member)
                        .where(member.memberSocialId.eq(socialId).and(member.memberSocialType.eq(registrationId)))
                        .where().fetchFirst());
    }

    // 회원가입시 ID 중복기능
    @Override
    public Optional<String> selectMemberIdCheck(String memberId) {
        return Optional.ofNullable(
                queryFactory.select(member.memberIdEmail)
                        .from(member)
                        .where(member.memberIdEmail.eq(memberId))
                        .fetchFirst()
        );
    }

    // 일반 로그인
    // email과 pw가 일치하는지 보고, isDelete가 false인 경우에만 로그인이 되게 한다.
    @Override
    public Optional<Member> selectMemberLogin(String memberIdEmail) {
        return Optional.ofNullable(
                queryFactory.select(member)
                        .from(member)
                        .where(member.memberIdEmail.eq(memberIdEmail)
                                .and(member.memberIsDelete.eq(false)))
                        .fetchFirst()
        );
    }

    // 회원 ID로 검색시 ID와 이름 함께 뜨게하기
    @Override
    public Optional<SearchMemberDTO> searchMember(String memberIdMail) {
        return Optional.ofNullable(
                queryFactory.select(Projections.constructor(SearchMemberDTO.class, member.memberIdEmail, member.memberName))
                        .from(member)
                        .where(member.memberIdEmail.eq(memberIdMail).and(member.memberIsDelete.eq(false)))
                        .fetchFirst()
        );
    }

    // ID 찾기시 회원 이름과 전화번호를 가지고 mail 알려줌
    @Override
    public List<String> memberIDFind(String memberName, String memberPhone) {
        return queryFactory.select(member.memberIdEmail)
                .from(member)
                .where(
                        member.memberName.eq(memberName)
                                .and(member.memberPhone.eq(memberPhone))
                                .and(member.memberSocialType.eq(SocialType.NORMAL))
                )
                .fetch();
    }

    // PW 찾기시 회원이름,이메일,전화번호 일치시 임시 비밀번호 메일로 전송
    @Override
    public Optional<Member> memberPWFind(String memberIdeMail, String memberName, String memberPhone) {
        return Optional.ofNullable(
                queryFactory.select(member)
                        .from(member)
                        .where(
                                member.memberIdEmail.eq(memberIdeMail)
                                        .and(member.memberName.eq(memberName))
                                        .and(member.memberPhone.eq(memberPhone))
                                        .and(member.memberSocialType.eq(SocialType.NORMAL))
                        )
                        .fetchFirst()
        );
    }

}
