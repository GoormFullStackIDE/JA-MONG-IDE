package com.groom.demo.member.repository;

import com.groom.demo.member.entity.ProjectMember;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectMemberRepository extends JpaRepository<ProjectMember, Long>, ProjectMemberRepositoryCustom{
}
