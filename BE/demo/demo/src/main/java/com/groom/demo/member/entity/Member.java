package com.groom.demo.member.entity;

import com.groom.demo.auth.oauth.SocialType;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@Builder
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

    @Column(name = "member_file", length = 3000)
    private String memeberFile;

    @Enumerated
    @Column(name = "member_socialType")
    private SocialType memberSocialType;

    @Column(name = "member_socialId", length = 500)
    private String memeberSocialId;

    @Column(name = "member_Token", length = 500)
    private String memeberToken;

    @Column(name = "memeber_date")
    private LocalDateTime memeberDate;

    @Column(name = "memeber_lastlogin")
    private LocalDateTime memberLastLogin;


    public void changeToken(String memeberToken) {
        this.memeberToken = memeberToken;
    }

}

