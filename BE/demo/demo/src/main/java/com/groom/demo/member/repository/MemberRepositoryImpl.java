package com.groom.demo.member.repository;

import com.groom.demo.member.dto.MemberResponseDto;
import com.groom.demo.member.entity.QMember;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import static com.groom.demo.member.entity.QMember.member;
public class MemberRepositoryImpl implements MemberRepositoryCustom{
    @Autowired
    private JPAQueryFactory queryFactory;

    @Override
    public List<MemberResponseDto> memberdata(String memberEmail, String memberPass) {

        return queryFactory.select(
                        Projections.constructor(MemberResponseDto.class, member.memberIdEmail, member.memberName, member.memberPhone, member.memberAdress, member.memeberDate, member.memberLastLogin)
                )
                .from(member)
                .where(member.memberIdEmail.eq(memberEmail), member.memberPass.eq(memberPass))
                .fetch();
    }
}
