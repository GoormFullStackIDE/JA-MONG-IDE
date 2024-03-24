package com.groom.demo.projectmember.repository;

import com.groom.demo.code.entity.Project;
import com.groom.demo.member.entity.Member;
import com.groom.demo.projectmember.dto.ContainerPageDTO;
import com.groom.demo.projectmember.dto.MainPageIndexDTO;

import java.util.List;
import java.util.Optional;

public interface ProjectMemberRepositoryCustom {

    // 컨테이너 사용자 강퇴
    void kickMember (Member otherMember, Project project);

    // 중계테이블의 외래키이면서 각 테이블의 PK인 MemberNo와 프로젝트테이블의 ProjectNo의 값을 뽑아내서
    // isLeader가 false인 경우는 강퇴를 못하고, true이면 처리한다.
    // 여기서는 isLeader를 뽑고, Service에서 true, false를 처리한다.
    // ServiceImpl에서 Member, Project를 뽑아서 Long처리하지 않는다.
    Optional<Boolean> isLeader(Member memberNo, Project projectNo);

    // 사용자가 로그인 후, 메인페이지에서 바라보는 컨테이너(프로젝트) 조회
    List<MainPageIndexDTO> mainPageIndex(Member mainPageMember);

    // 컨테이너 입장시 컨테이너 참여자 목록 조회
    List<ContainerPageDTO> containerPage(String containerId);
}
