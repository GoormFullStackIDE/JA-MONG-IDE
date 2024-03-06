package com.groom.demo.member.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Member {
    // 컬럼들을 받아온다.
    // String의 경우 length로 크기를 정하고, not null은 따로 설정한다.
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberNo;

    @Column(name = "member_id_email", nullable = false, length = 100)
    private String memberIdEmail;

    @Column(name = "member_name", nullable = false, length = 100)
    private String memberName;

    @Column(name = "memeber_pass", nullable = false, length = 300)
    private String memberPass;

    @Column(name = "member_passHistory", length = 300)
    private String memberPassHistory;

    @Column(name ="member_phone", nullable = false, length = 100)
    private String memberPhone;

    @Column(name = "member_adress", length = 400)
    private String memberAdress;

    @Column(name = "memeber_date")
    private LocalDateTime memeberDate;

    @Column(name = "memeber_lastlogin")
    private LocalDateTime memberLastLogin;

    // 생성자를 만든다.
    // Builder = JPA 방식으로 데이터를 넣을 때 빌더를 같이 이용하려고
    @Builder
    public Member(String memberIdEmail, String memberName, String memberPass, String memberPassHistory, String memberPhone, String memberAdress, LocalDateTime memeberDate, LocalDateTime memberLastLogin) {
        this.memberIdEmail = memberIdEmail;
        this.memberName = memberName;
        this.memberPass = memberPass;
        this.memberPassHistory = memberPassHistory;
        this.memberPhone = memberPhone;
        this.memberAdress = memberAdress;
        this.memeberDate = memeberDate;
        this.memberLastLogin = memberLastLogin;
    }
}

