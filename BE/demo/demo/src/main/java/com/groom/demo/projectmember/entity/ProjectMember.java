package com.groom.demo.projectmember.entity;

import com.groom.demo.code.entity.Project;
import com.groom.demo.member.entity.Member;
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

    // 프로젝트에 초대된 사용자의 이메일
    @Column(name = "project_invite_member", length = 300)
    private String projectInviteMember;

    // 프로젝트 제목
    @Column(name = "project_name", length = 50)
    private String projectName;

    // 제욱님이 public 생성자 요청
    public ProjectMember(Long projectMemberNo, Project projectNo, Member memberNo2, Boolean projectLeader, String projectInviteMember, String projectName) {
        this.projectMemberNo = projectMemberNo;
        this.projectNo = projectNo;
        this.memberNo2 = memberNo2;
        this.projectLeader = projectLeader;
        this.projectInviteMember = projectInviteMember;
        this.projectName = projectName;
    }
}
