package com.groom.demo.member.service;

import com.groom.demo.member.dto.MemberPageInfoDto;
import com.groom.demo.member.repository.MemberRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@Transactional
public class MemberServiceImpl implements MemberService{

    @Autowired
    private MemberRepository memberRepository;

    @Override
    public List<MemberPageInfoDto> memberdata(String memberEmail, String memberPass) {
        return memberRepository.memberdata(memberEmail, memberPass);
    }
}
