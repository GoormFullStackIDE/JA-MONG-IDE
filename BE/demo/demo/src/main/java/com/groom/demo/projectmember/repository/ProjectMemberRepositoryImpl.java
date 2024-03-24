package com.groom.demo.projectmember.repository;

import com.groom.demo.code.entity.Project;
import com.groom.demo.member.entity.Member;
import com.groom.demo.projectmember.dto.ContainerPageDTO;
import com.groom.demo.projectmember.dto.MainPageIndexDTO;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

// entity 생성 후 compile해서 생긴 Qclass
import static com.groom.demo.projectmember.entity.QProjectMember.projectMember;
import static com.groom.demo.code.entity.QProject.project;
import static com.groom.demo.member.entity.QMember.member;

public class ProjectMemberRepositoryImpl implements ProjectMemberRepositoryCustom {
    @Autowired
    private JPAQueryFactory queryFactory;

    // 강퇴
    @Override
    public void kickMember(Member otherMember, Project project) {
        queryFactory.delete(projectMember)
                .where(projectMember.memberNo2.eq(otherMember).and(projectMember.projectNo.eq(project)))
                .execute();
    }

    // ProjectMemberRepositoryCustom의 isLeader를 받아서 Boolean으로 처리한다 -> true, false가 나옴
    @Override
    public Optional<Boolean> isLeader(Member memberNo, Project projectNo) {
        return Optional.ofNullable(
                queryFactory.select(projectMember.projectLeader)
                        .from(projectMember)
                        .where(projectMember.memberNo2.eq(memberNo).and(projectMember.projectNo.eq(projectNo)))
                        .fetchFirst()
        );
    }

    // 사용자가 로그인 후 바라보는 컨테이너(프로젝트)목록 조회
    // Join 사용
    // Member - ProjectMember - Project(Code)를 Join 후, 조건문으로 나(로그인한 사용자)와 관련된 데이터만 뽑음
    // 그 데이터는 Project - ContainerID와 ProjectMember - isLeader를 받아옴
    @Override
    public List<MainPageIndexDTO> mainPageIndex(Member mainPageMember) {
        return queryFactory.select(
                        Projections.constructor(MainPageIndexDTO.class, project.containerID, projectMember.projectLeader)
                )
                .from(member)
                .join(projectMember)
                .on(member.eq(projectMember.memberNo2))
                .join(project)
                .on(project.eq(projectMember.projectNo))
                .where(member.eq(mainPageMember))
                .fetch();
    }

    @Override
    public List<ContainerPageDTO> containerPage(String containerId) {

        return queryFactory.select(
                        Projections.constructor(ContainerPageDTO.class, member.memberIdEmail, member.memberName, projectMember.projectLeader)
                )
                .from(project)
                .join(projectMember)
                .on(project.eq(projectMember.projectNo))
                .join(member)
                .on(member.eq(projectMember.memberNo2))
                .where(project.no.in(JPAExpressions
                        .select(project.no)
                        .from(member)
                        .join(projectMember)
                        .on(member.eq(projectMember.memberNo2))
                        .join(project)
                        .on(project.eq(projectMember.projectNo))
                        .where(project.containerID.eq(containerId))))
                .fetch();


    }
}
