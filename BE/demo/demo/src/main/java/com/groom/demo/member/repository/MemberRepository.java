package com.groom.demo.member.repository;

import com.groom.demo.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> , MemberRepositoryCustom{

}
