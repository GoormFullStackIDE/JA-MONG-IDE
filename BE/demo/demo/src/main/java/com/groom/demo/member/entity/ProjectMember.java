package com.groom.demo.member.entity;

import com.groom.demo.code.entity.Project;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;

@Entity
@Getter
@Builder
public class ProjectMember {

    // 중계테이블 번호
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long projectMemberNo;

    // 프로젝트 아이디
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_no")
    private Project projectNo;

    // 멤버 넘버
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_no2")
    private Member memberNo2;

    // 방장 여부 -> 컨테이너 생성시에만 true로 바뀜
    @Builder.Default
    @Column(name = "project_leader")
    private Boolean projectLeader = false;
}
