package com.groom.demo.code.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;

@Getter@Setter
@Entity
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_no", length = 30)
    private String no;
    @Column(name = "project_owner", length = 50)
    private String user;
    @Column(name = "project_createdate", length = 20)
    private LocalDateTime date;
    @Column(name = "language", length = 30)
    private String language;

//    @OneToMany(mappedBy = "project")
//    private List<Project_Member> members = new ArrayList<>();
}

