package com.groom.demo.code.entity;

import com.groom.demo.member.entity.ProjectMember;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.*;


@Getter@Setter
@Entity
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_no", length = 30)
    private Long project_no;
    @Column(name = "project_ID", length = 100)
    private String containerID;
    @Column(name = "project_owner", length = 50)
    private String user;
    @Column(name = "project_createdTime", length = 20)
    private LocalDateTime date;
    @Column(name = "language", length = 30)
    private String language;

    @OneToMany(mappedBy = "projectNo")
    private List<ProjectMember> members = new ArrayList<>();

}

