package com.groom.demo.member.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;

@Entity
@Getter
@Builder
public class ProjectMember {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long projectMemberNo;

    @Column(name = "project_member_invite")
    private Boolean projectMemberInvite;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_no2")
    private Member memberNo2;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "project_no")
//    private Code projectNo;
}
