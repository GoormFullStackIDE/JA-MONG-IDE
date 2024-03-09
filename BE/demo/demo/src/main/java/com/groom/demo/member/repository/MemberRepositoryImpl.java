package com.groom.demo.member.repository;

import com.groom.demo.auth.oauth.SocialType;
import com.groom.demo.member.dto.MemberPageInfoDto;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

import static com.groom.demo.member.entity.QMember.member;

public class MemberRepositoryImpl implements MemberRepositoryCustom {
    @Autowired
    private JPAQueryFactory queryFactory;

    // 프로필페이지DTO == /jamonginfo
    @Override
    public List<MemberPageInfoDto> memberdata(String memberEmail, String memberPass) {

        return queryFactory.select(
                        Projections.constructor(MemberPageInfoDto.class,
                                member.memberIdEmail,
                                member.memberName,
                                member.memberPhone,
                                member.memberAdress,
                                member.memeberFile,
                                member.memeberDate,
                                member.memberLastLogin)
                )
                .from(member)
                .where(member.memberIdEmail.eq(memberEmail).and(member.memberPass.eq(memberPass)))
                .fetch();
    }

    @Override
    public Optional<String> selectTokenByMemberNo(Long memberNo) {
        return Optional.ofNullable(
                queryFactory.select(member.memeberToken)
                        .from(member)
                        .where(member.memberNo.eq(memberNo))
                        .where().fetchFirst());
    }

    @Override
    public Optional<Long> selectMemeberBySocialId(SocialType registrationId, String socialId) {
        return Optional.ofNullable(
                queryFactory.select(member.memberNo)
                .from(member)
                .where(member.memeberSocialId.eq(socialId).and(member.memberSocialType.eq(registrationId)))
                .where().fetchFirst());
    }
}
